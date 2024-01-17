function createTextNode (nodeValue) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue,
      children: []
    }
  }
}

function createElement (type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        const isTextNode =
          typeof child === "string" || typeof child === "number";
        return isTextNode ? createTextNode(child) : child;
      })
    }
  }
}

let wipRoot = null
let currentRoot = null
let nextWorkOfUnit = null

function render (el, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [el]
    }
  }
  nextWorkOfUnit = wipRoot

  // const { type, props } = el
  // const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode(props.nodeValue) : document.createElement(type)

  // // 遍历props，排除children
  // Object.keys(props).forEach(key => {
  //   if (key !== 'children') {
  //     dom[key] = props[key]
  //   }
  // })

  // // 处理children
  // props.children.forEach(child => {
  //   render(child, dom)
  // })

  // container.append(dom)
}

function workLoop (deadline) {
  let shouldYieId = false

  while (!shouldYieId && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)
    shouldYieId = deadline.timeRemaining() < 1
  }

  if (!nextWorkOfUnit && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop)
}

function commitRoot () {
  commitWork(wipRoot.child);
  currentRoot = wipRoot
  wipRoot = null;
}

function commitWork (fiber) {
  if (!fiber) return;
  let fiberParent = fiber.parent;
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent;
  }

  if (fiber.effectTag === 'update') {
    updateProps(fiber.dom, fiber.props, fiber.alternate?.props)
  } else if (fiber.effectTag === 'placement') {
    if (fiber.dom) fiberParent.dom.append(fiber.dom);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function createDom (type) {
  return type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(type)
}

function updateProps (dom, nextProps, prevProps) {
  // Object.keys(props).forEach(key => {
  //   if (key !== 'children') {
  //     dom[key] = props[key]
  //   }
  // })

  // 1. 老的有， 新的没有 -》 删除 
  Object.keys(prevProps).forEach(key => {
    if (key !== 'children') {
      if (!(key in nextProps)) {
        dom.removeAttribute(key)
      }
    }
  })
  // 2. 新的有，老得没有 -》 添加
  // 3. 新的有，老的也有 -》 修改
  Object.keys(nextProps).forEach(key => {
    if (key !== 'children') {
      if (nextProps[key] !== prevProps[key]) {
        if (key.startsWith('on')) {
          const eventType = key.slice(2).toLowerCase()

          dom.removeEventListener(eventType, prevProps[key])
          dom.addEventListener(eventType, nextProps[key])
        } else {
          dom[key] = nextProps[key]
        }
      }
    }
  })


}

function reconcileChildren (fiber, children) {
  let oldFiber = fiber.alternate?.child
  // const children = fiber.props.children
  let preChild = null
  children.forEach((child, index) => {
    const isSameType = oldFiber && oldFiber.type === child.type;
    let newFiber
    if (isSameType) {
      // update
      newFiber = {
        type: child.type,
        props: child.props,
        child: null,
        parent: fiber,
        sibling: null,
        dom: oldFiber.dom,
        effectTag: 'update',
        alternate: oldFiber
      }
    } else {
      newFiber = {
        type: child.type,
        props: child.props,
        child: null,
        parent: fiber,
        sibling: null,
        dom: null,
        effectTag: 'placement'
      }
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    if (index === 0) {
      fiber.child = newFiber
    } else {
      preChild.sibling = newFiber
    }

    preChild = newFiber
  })
}

function updateFunctionComponent (fiber) {
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function updateHostFunction (fiber) {
  if (!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type));
    updateProps(dom, fiber.props, {});
  }

  const children = fiber.props.children;
  reconcileChildren(fiber, children);
}

function performWorkOfUnit (fiber) {
  const isFunctionComponent = typeof fiber.type === "function";

  isFunctionComponent
    ? updateFunctionComponent(fiber)
    : updateHostFunction(fiber);

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
}

requestIdleCallback(workLoop)

function update () {
  wipRoot = {
    dom: currentRoot.dom,
    props: currentRoot.props,
    alternate: currentRoot
  }
  nextWorkOfUnit = wipRoot
}

const React = {
  update,
  createTextNode,
  createElement,
  render
}


export default React

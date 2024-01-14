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
        return typeof child === 'string' ? createTextNode(child) : child
      })
    }
  }
}

let nextWorkOfUnit = null

function render (el, container) {
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el]
    }
  }
  
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

  requestIdleCallback(workLoop)
}

function createDom (type) {
  return type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(type)
}

function updateProps (dom, props) {
  Object.keys(props).forEach(key => {
    if (key !== 'children') {
      dom[key] = props[key]
    }
  })
}

function initChildren (fiber) {
  const children = fiber.props.children
  let preChild = null
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null
    }

    if (index === 0) {
      fiber.child = newFiber
    } else {
      preChild.sibling = newFiber
    }

    preChild = newFiber
  })
}

function performWorkOfUnit (fiber) {
  if(!fiber.dom){
    const dom = (fiber.dom = createDom(fiber.type))
    fiber.parent.dom.append(dom)
    updateProps(dom, fiber.props)
  }

  initChildren(fiber)

  if(fiber.child){
    return fiber.child
  }

  if(fiber.sibling){
    return fiber.sibling
  }

  return fiber.parent?.sibling
}

requestIdleCallback(workLoop)

const React = {
  createTextNode,
  createElement,
  render
}


export default React

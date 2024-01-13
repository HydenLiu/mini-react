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

function render (el, container) {
  const { type, props } = el
  const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode(props.nodeValue) : document.createElement(type)

  // 遍历props，排除children
  Object.keys(props).forEach(key => {
    if (key !== 'children') {
      dom[key] = props[key]
    }
  })

  // 处理children
  props.children.forEach(child => {
    render(child, dom)
  })

  container.append(dom)
}

const React = {
  createTextNode,
  createElement,
  render
}


export default React

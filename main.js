// 1、页面上线展示 “mini-react”
const Root = document.querySelector("#root") // document.getElementById("root")
// const TextNode = document.createTextNode("mini-react")

// Root.appendChild(TextNode)

// const dom = document.createElement("div")
// dom.id = 'div'
// Root.append(dom)
// dom.append(TextNode)
// console.log(dom)

// 2、vdom, Tip: 容易忘记react vdom的数据结构
const el = {
  type: "div",
  props: {
    id: "id",
    children: [
      {
        type: "TEXT_ELEMENT",
        props: {
          nodeValue: "mini-react",
          children: []
        }
      }
    ]
  },
}

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
      children
    }
  }
}

console.log(createElement('div', { id: 'createElement', class: 'text-red' }, createTextNode('mini-react')))

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

// render(el, Root)

// 






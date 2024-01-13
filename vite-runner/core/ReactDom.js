import React from './React.js'

function createRoot (container) {
  return {
    render (App) {
      React.render(App, container)
    }
  }
}

const ReactDom = {
  createRoot
}

export default ReactDom

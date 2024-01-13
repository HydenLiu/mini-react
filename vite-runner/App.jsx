// js pragma
// 这个可以自定义React名字 /**@jsx HReact.createElement */

import React from './core/React.js'
// const el = React.createElement('div', { id: 'createElement', class: 'text-red' }, 'mini-react', '!!!')

const App = <div>mini-react</div>

function AppOne(){
  return <div>mini-react</div>
}
console.log(AppOne)

export default App 

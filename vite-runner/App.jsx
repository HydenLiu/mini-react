import React from './core/React.js'

let count = 10
let showBar = false
function Counter({ num }) {
  function handleClick() {
    console.log('click')
    count++
    React.update()
  }

  function handleBarClick() {
    showBar = !showBar
    React.update()
  }

  const foo = (
    <div>
      foo
      <div>child1</div>
      <div>child2</div>
    </div>
  )

  // function Foo() {
  //   return (
  //     <div>
  //       foo
  //       <div>child</div>
  //     </div>
  //   )
  // }
  const bar = <div>bar</div>

  return (
    <div>
      count: {count}
      <div>{showBar ? bar : foo}</div>
      <button onClick={handleBarClick}>click</button>
    </div>
  )
}

function AppOne() {
  return <div>mini-react!!!</div>
}

function App() {
  return (
    <div>
      mini-react
      <Counter num={10}></Counter>
    </div>
  )
}

export default App

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

  // const foo = <div>foo</div>
  function Foo() {
    return <div>foo</div>
  }
  const bar = <p>bar</p>

  return (
    <div>
      count: {count}
      <div>{showBar ? bar : <Foo />}</div>
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

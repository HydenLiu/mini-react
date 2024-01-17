import React from "./core/React.js";

let count = 10
function Counter({ num }) {
  function handleClick() {
    console.log('click')
    count++
    React.update()
  }

  return (
    <div>
      count: {count}
      <button onClick={handleClick}>click</button>
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

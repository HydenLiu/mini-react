import React from './core/React.js'

let count = 10
let showBar = false
function Counter({ num }) {
  console.log(`main rerun`)
  const update = React.update()
  function handleClick() {
    // console.log('click')
    count++
    update()
  }

  function handleBarClick() {
    showBar = !showBar
    update()
  }

  // const foo = (
  //   <div>
  //     foo
  //     <div>child1</div>
  //     <div>child2</div>
  //   </div>
  // )

  let countFoo = 0
  function Foo() {
    console.log('Foo rerun')
    const update = React.update()
    function handleClick() {
      // console.log('Foo click')
      countFoo++
      update()
    }

    return (
      <div>
        foo
        <div>{countFoo}</div>
        <button onClick={handleClick}>click</button>
      </div>
    )
  }

  let countBar = 0
  function Bar() {
    console.log('Bar rerun')
    const update = React.update()
    function handleClick() {
      // console.log('Bar click')
      countBar++
      update()
    }

    return (
      <div>
        bar
        <div>{countBar}</div>
        <button onClick={handleClick}>click</button>
      </div>
    )
  }

  return (
    <div>
      count: {count}
      {/* <div>{showBar ? bar : foo}</div> */}
      {/* <div>{showBar && bar}</div> */}
      <button onClick={handleClick}>click</button>
      <Foo></Foo>
      <Bar></Bar>
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

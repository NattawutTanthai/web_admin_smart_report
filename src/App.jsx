import { useState } from 'react'
import DrawerComp from './components/DrawerComp'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DrawerComp />
    </>
  )
}

export default App

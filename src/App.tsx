import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { Button } from '@material-tailwind/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>This is a title</h1>
      <Button>This is a button</Button>
    </>
  )
}

export default App

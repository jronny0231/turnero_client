import { Toaster, toast } from "sonner"
import "./assets/app.css"

function App() {

  const handleClick = () => {
    toast("Boton clickeado!")
  }

  return (
    <>
      <h1>Hola Mundo</h1>
      <button onClick={handleClick}>Click me!</button>
      <Toaster />
    </>
  )
}

export default App

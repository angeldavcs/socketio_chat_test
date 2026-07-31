import { useEffect } from "react";
import { useState } from "react"
import { io } from "socket.io-client"

const socket = io("http://localhost:3000")

function App() {
  const [historial, setHistorial] = useState([]);
  const [chatInput, setChatInput] = useState("");

  function alEnviar() {
    socket.emit("chat", chatInput)
    setChatInput("")
  }

  useEffect(() => {
    function nuevoMensaje(target, mensaje) {
      console.log(target,"nos envio el siguiente mensaje:", mensaje)
    }

    socket.on("chat", nuevoMensaje)
    return () => {
      socket.off("chat", nuevoMensaje)
    }
  })

  return (
    <>

      <div className="chat">

      </div>
      <nav>
        <input
          type="text"
          onChange={({ target }) => setChatInput(target.value)}
          value={chatInput}
        />
        <button onClick={alEnviar} >
          Enviar
        </button>
      </nav>

    </>
  )
}

export default App

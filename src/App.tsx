import { use, useState } from "react"
import ActionButton from "./components/actionButton"
import Countdown from "./components/countdown"



function App() {
  const [picked, setPicked] = useState<string | null>(null);
  const [timerKey, setTimerKey] = useState(0);

  let onFinish = () => {
    console.log("timer fertig!");
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-6xl font-bold text-black">Hello World!</h1>

      <div>
        <ActionButton
          text="🪨"
          onClick={() => setPicked("rock")}
          disabled={picked !== null}
        />

        <ActionButton
          text="✂️"
          onClick={() => setPicked("scissors")}
          disabled={picked !== null}
        />

        <ActionButton
          text="📄"
          onClick={() => setPicked("paper")}
          disabled={picked !== null}
        />
      </div>

      <div className={picked !== null ? "block" : "hidden"}>
        <Countdown key={timerKey} seconds={3} onFinish={onFinish} />
      </div>
      <button onClick={() => setTimerKey((k) => k + 1)}>
        Restart Timer
      </button>
    </div>
  )
}

export default App

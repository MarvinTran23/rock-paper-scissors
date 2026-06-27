import { useState } from "react"
import ActionButton from "./components/actionButton"
import Countdown from "./components/countdown"

function App() {
  const [picked, setPicked] = useState<string | null>(null);
  const [finalPick, setFinalPick] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [roundKey, setRoundKey] = useState(0);

  const isFinished = finalPick !== null;

  const onFinish = () => {
    setIsRunning(false);
    setFinalPick(picked);
    console.log(`Zeit ist um! Picked: ${picked}`);
  }

  const handlePick = (value: string) => {
    setPicked(value);
    setIsRunning(true);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold text-black">
        Rock Paper Scissor Game
      </h1>

      <div>
        <ActionButton
          text="🪨"
          onClick={() => handlePick("rock")}
          disabled={isFinished}
        />

        <ActionButton
          text="✂️"
          onClick={() => handlePick("scissor")}
          disabled={isFinished}
        />

        <ActionButton
          text="📄"
          onClick={() => handlePick("paper")}
          disabled={isFinished}
        />
      </div>

      <div className={picked !== null ? "block" : "hidden"}>
        <Countdown
          key={roundKey}
          running={isRunning}
          seconds={3}
          onFinish={onFinish}
        />

      </div>
      <button
        className="
            px-6 py-3 mt-4
            text-2xl font-bold
            border rounded-lg
            hover:bg-black hover:text-white
            transition
          "
        onClick={() => {
          setRoundKey(prev => prev + 1);
          setFinalPick(null);
          setPicked(null);
          setIsRunning(false);
        }}
      >
        New Round
      </button>

      <h2>{finalPick !== null ? finalPick : picked}</h2>

    </div>
  )
}

export default App


import { useState } from "react"
import ActionButton from "./components/actionButton"
import Countdown from "./components/countdown"

function App() {
  const [picked, setPicked] = useState<string | null>(null);
  const [finalPick, setFinalPick] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [roundKey, setRoundKey] = useState(0);
  const [gameResult, setGameResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  let API_URL: string = `http://localhost:8080/play?choice=${picked}`;

  const isFinished = finalPick !== null;

  const onFinish = async () => {
    setIsRunning(false);
    setFinalPick(picked);
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        API_URL,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      setGameResult(data);
      console.log("Backend response: ", data);

    } catch (error) {
      console.log(error);
      setError("Backend not reachable ❌");
    } finally {
      setIsLoading(false);
    }

    console.log(`Time is over! Picked: ${picked}`);
  }

  const handlePick = (value: string): void => {
    setPicked(value);
    setIsRunning(true);
  };

  const getResultText = (): string => {
    switch (gameResult?.result) {
      case "WIN":
        return "You Win!";
      case "LOSE":
        return "You Lose!";
      case "DRAW":
        return "Draw!";
      default:
        return "";
    }
  };

  return (
    <div className="
      w-screen min-h-screen
      flex flex-col items-center gap-6

      justify-start
      pt-10

      sm:justify-center sm:pt-0
    ">
      <h1 className="text-4xl font-bold text-black">
        Rock Paper Scissor Game
      </h1>

      {/* Countdown */}
      <div className="h-28 flex flex-col items-center justify-center text-center">

        {error && (
          <div className="text-red-500 font-bold text-lg">
            {error}
          </div>
        )}

        {!error && isRunning && !gameResult && (
          <Countdown
            key={roundKey}
            running={isRunning}
            seconds={3}
            onFinish={onFinish}
          />
        )}

        {!error && !isRunning && gameResult && (
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold">
              {getResultText()}
            </h2>

            <div className="text-sm text-gray-500">
              {gameResult.computer === "rock" && "Computer chose: 🪨"}
              {gameResult.computer === "scissor" && "Computer chose: ✂️"}
              {gameResult.computer === "paper" && "Computer chose: 📄"}
              {!gameResult.computer && "❓"}
            </div>
          </div>
        )}

        {!isLoading && !error && !isRunning && !gameResult && (
          <div className="text-lg text-gray-400">
            Choose your move:
          </div>
        )}

      </div>



      {/* Actionbuttons */}
      <div className="flex justify-center gap-10">
        <div className="w-36 h-28 flex items-center justify-center">
          <ActionButton
            text="🪨"
            onClick={() => handlePick("rock")}
            disabled={isFinished}
            selected={picked === "rock"}
          />
        </div>

        <div className="w-36 h-28 flex items-center justify-center">
          <ActionButton
            text="✂️"
            onClick={() => handlePick("scissor")}
            disabled={isFinished}
            selected={picked === "scissor"}
          />
        </div>

        <div className="w-36 h-28 flex items-center justify-center">
          <ActionButton
            text="📄"
            onClick={() => handlePick("paper")}
            disabled={isFinished}
            selected={picked === "paper"}
          />
        </div>
      </div>

      <div className="h-16 flex items-center justify-center">
        {isFinished && (
          <button
            className="
        px-6 py-3
        text-2xl font-bold
        border rounded-lg
        hover:bg-black hover:text-white
        transition-all duration-150
        active:translate-y-1 active:shadow-sm
      "
            onClick={() => {
              setRoundKey(prev => prev + 1);
              setFinalPick(null);
              setPicked(null);
              setIsRunning(false);
              setGameResult(null);
            }}
          >
            New Round
          </button>
        )}
      </div>
    </div>
  )
}

export default App


import { useEffect, useState } from "react"
import ActionButton from "../components/actionButton"
import Countdown from "../components/countdown"

export default function Play() {
    // Gamelogic
    const [picked, setPicked] = useState<string | null>(null);
    const [finalPick, setFinalPick] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [roundKey, setRoundKey] = useState(0);
    const [gameResult, setGameResult] = useState<any>(null);

    // Error Handling
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Highscore
    const [playerName, setPlayerName] = useState("");
    const [highscore, setHighscore] = useState<number>(0);
    const [showNameInput, setShowNameInput] = useState(false);

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
                    credentials: "include",
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

    const submitScore = async () => {
        try {
            await fetch("http://localhost:8080/highscore/finish", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    playerName
                })
            });

            setShowNameInput(false);
            setPlayerName("");

        } catch (err) {
            console.log("Error saving score");
        }
    };

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

    useEffect(() => {
        if (!gameResult) return;



        if (gameResult.result === "LOSE") {
            setShowNameInput(true);
        } else if (gameResult.result === "WIN") {
            setHighscore(prev => prev + 1)
            setShowNameInput(false);
        } else {
            setShowNameInput(false);
        }
    }, [gameResult]);

    return (
        <div className="
            w-screen min-h-screen
            flex flex-col items-center gap-6
            justify-start
            pt-10
            sm:justify-center sm:pt-0
            ">
            <div className="mt-10 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Rock-Paper-Scissor-Game
                </h1>
            </div>

            <p className="text-2xl font-bold text-12">
                Score: {highscore}
            </p>

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




            <div className="h-16 flex flex-col items-center justify-center gap-4">

                {showNameInput && (
                    <div className="flex items-center justify-between mt-20 gap-1">

                        <input
                            className="border p-2 mx-4 flex-1 max-w-xs"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Your name"
                        />

                        <button
                            className="px-4 py-2 border hover:bg-black hover:text-white transition"
                            onClick={submitScore}
                            disabled={!playerName}
                        >
                            Submit
                        </button>

                    </div>
                )}

                {isFinished && (
                    <button
                        className="
                            mt-1
                            px-6 py-3
                            text-2xl font-bold
                            border
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

                            if (gameResult?.result === "LOSE") {
                                setHighscore(0)
                            }
                        }}
                    >
                        {gameResult?.result === "LOSE"
                            ? "Restart Game"
                            : "Next Round"}
                    </button>
                )}

            </div>
        </div >
    )
}



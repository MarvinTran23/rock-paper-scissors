import { useEffect, useState } from "react";

type Player = {
    id: number;
    playerName: string;
    score: number;
};

export default function Highscore() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [error, setError] = useState<string | null>(null);

    const apiURL = "http://localhost:8080/highscore/leaderboard";

    const fetchLeaderboard = async () => {
        try {
            const res = await fetch(apiURL, {
                credentials: "include"
            });

            if (!res.ok) {
                throw new Error("Server error");
            }

            const data = await res.json();
            setPlayers(data);

        } catch (err) {
            setError("Backend not reachable ❌");
        }
    };

    useEffect(() => {
        fetchLeaderboard();

        // let data = [
        //     { "playerName": "Ben", "score": 2, "id": 2 },
        //     { "playerName": "LALO", "score": 0, "id": 1 }
        // ]
        // setPlayers(data)
    }, []);

    return (
        <div className="p-10 max-w-2xl mx-auto">

            <h1 className="text-3xl font-bold text-center mb-8">
                Leaderboard
            </h1>

            {error && (
                <p className="text-red-500 text-center mb-4">
                    {error}
                </p>
            )}

            {/* TABLE */}
            <div className="border">
                <table className="w-full text-left border-collapse">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 border-b">Rank</th>
                            <th className="p-4 border-b">Player</th>
                            <th className="p-4 border-b text-right">Score</th>
                        </tr>
                    </thead>

                    <tbody>
                        {players
                            .sort((a, b) => b.score - a.score)
                            .map((p, index) => (
                                <tr key={p.id} className="border-b">
                                    <td className="p-4">
                                        {index + 1}
                                    </td>

                                    <td className="p-4">
                                        {p.playerName}
                                    </td>

                                    <td className="p-4 text-right font-bold text-blue-600">
                                        {p.score}
                                    </td>
                                </tr>
                            ))}
                    </tbody>

                </table>

            </div>
        </div>
    );
}
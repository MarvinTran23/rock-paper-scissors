import { useEffect, useState } from "react";

type CountdownProps = {
    seconds: number;
    onFinish?: () => void;
}

function Countdown({ seconds, onFinish}: CountdownProps) {
    const [count, setCount] = useState(seconds);

    useEffect(() => {
        setCount(seconds);

        if (seconds <= 0) {
            onFinish?.();
            return;
        }

    

    const interval = setInterval(() => {
        setCount((prev) => {
            if (prev <= 1) {
                clearInterval(interval);
                onFinish?.();
                return 0;
            }
            return prev - 1;
        })
    }, 1000);

    return () => clearInterval(interval);
    }, [seconds, onFinish])

    return (
        <div className="text-6xl font-bold">
            {count}
        </div>
    );
}

export default Countdown
type ActionButtonProps = {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
}

function ActionButton({ text, onClick, disabled }: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`text-6xl px-6 py-3 mx-4 border-black rounded-lg hover:bg-amber-200 transition
            ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"}`}>
            {text}
        </button>
    );
}

export default ActionButton;
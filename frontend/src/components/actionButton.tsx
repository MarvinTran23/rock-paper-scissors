type ActionButtonProps = {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    selected?: boolean;
}




function ActionButton({ text, onClick, disabled, selected }: ActionButtonProps) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
                text-6xl px-6 py-3 mx-4 rounded-xl
                border border-gray-300
                bg-white
                shadow-md
                transition-all duration-150

                hover:shadow-lg
                active:translate-y-1


                ${selected ? "rainbow-border" : ""}
                ${disabled ? "opacity-40 cursor-not-allowed" : ""}
                `}>
            {text}
        </button>
    );
}

export default ActionButton;
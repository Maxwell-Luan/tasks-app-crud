type Props = {
    text: string,
    type?: "submit" | "button" | "reset";
}

export default function Button({text, type = "submit"}: Props){
    return(
        <button
        type={type}
        className="bg-bg-button text-white rounded-lg py-2 text-center cursor-pointer shadow-md hover:shadow-none">{text}</button>
    )
}
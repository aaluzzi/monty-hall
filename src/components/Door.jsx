function Door({content, opened, selected, select}) {
    const BASE_STYLE = "h-[256px] w-[164px] flex items-end justify-center text-8xl shadow-lg" + (selected ? " ring-4 ring-sky-700" : "")
    if (!opened) {
        return (
            <div onClick={select} className={BASE_STYLE + " bg-slate-800"}></div>
        );
    } else {
        return (
            <div className={BASE_STYLE + " bg-slate-700"}><div className="mb-4">{getEmojiFromContent(content)}</div></div>
        );
    }
}

function getEmojiFromContent(content) {
    if (content === "Goat") {
        return "🐐";
    } else if (content === "Car") {
        return "🚘";
    }
    return "";
}

export default Door;
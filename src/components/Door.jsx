function Door({innerRef, content, opened, selected, select}) {
    const BASE_STYLE = "h-[256px] w-[164px] px-4 py-6 flex text-8xl shadow-lg" + (selected ? " ring-4 ring-sky-700" : "")
    if (!opened) {
        return (
            <div ref={innerRef} onClick={select} className={BASE_STYLE + " items-center bg-slate-700"}>
                <div className="bg-slate-500 rounded-full h-5 w-5 shadow-lg"></div>
            </div>
        );
    } else {
        return (
            <div ref={innerRef} className={BASE_STYLE + " items-end justify-center border-r-[16px] border-slate-700 bg-slate-800"}>
                <div>{getEmojiFromContent(content)}</div>
            </div>
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
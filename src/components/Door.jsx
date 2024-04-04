function Door({innerRef, content, opened, selected, select}) {
    const BASE_STYLE = "aspect-[9/16] w-[90px] md:w-[150px] px-2 py-6 flex text-5xl md:text-7xl shadow-lg" + (selected ? " ring-4 ring-sky-700" : "")
    if (!opened) {
        return (
            <div ref={innerRef} onClick={select} className={BASE_STYLE + " items-center bg-slate-700"}>
                <div className="bg-slate-500 rounded-full w-[20%] aspect-square first-letter:shadow-lg"></div>
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
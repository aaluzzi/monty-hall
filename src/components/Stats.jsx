function Stats({wins, losses}) {
    return (
        <div className="rounded-lg w-[350px] p-4 shadow-lg text-lg flex gap-4 bg-slate-800">
            <Stat label="Wins" stat={wins} />
            <Stat label="Losses" stat={losses} />
            <Stat label="Winrate"stat={getWinRate(wins, losses) + "%"} />
        </div>
    );
}

function Stat({label, stat}) {
    return (
        <div className="w-[33%] p-2 rounded-md bg-slate-700">
            <div className="font-bold">{label}</div>
            <div>{stat}</div>
        </div>
    );
}

function getWinRate(wins, losses) {
    const total = wins + losses;
    let percentage;
    if (total === 0) {
        percentage = "0";
    } else {
        percentage = (wins / (total) * 100).toFixed(2)
    }
    return percentage;
}

export default Stats;
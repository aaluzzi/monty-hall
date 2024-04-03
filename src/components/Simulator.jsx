import Button from "./Button";
import { useState, useEffect } from 'react';

function Simulator({ onInitialDoorSelection, switchSelection, restartGame }) {
    const [switchDoor, setSwitchDoor] = useState(false);
    const [iterationRunning, setIterationRunning] = useState(false);

    const start = () => {
        setIterationRunning(true);
    }

    useEffect(() => {
        if (iterationRunning) {
            let totalRunningTime = 3000;
            let iterationCount = 1;
            let iterationRunTime = totalRunningTime / iterationCount;
            runIteration(iterationRunTime);
        }
    }, [iterationRunning]);

    const runIteration = async (iterationRunTime) => {
        const selectedDoorIndex = Math.floor(Math.random() * 3);
        onInitialDoorSelection(selectedDoorIndex);
        await delay(iterationRunTime / 3);
        switchSelection(selectedDoorIndex);
        await delay(iterationRunTime / 3);
        restartGame();
        await delay(iterationRunTime / 3);
        setIterationRunning(false); // Stop the iteration after completing one run
    }

    const handleSwitchChange = () => {
        setSwitchDoor(!switchDoor);
    }

    return (
        <div className="flex flex-col bg-slate-800 p-4 rounded-lg gap-2">
            <h1 className="text-xl w-full">Simulator</h1>
            <div className="flex flex-col bg-slate-700 rounded-md p-4 gap-2">
                <div>
                    <input type="checkbox" id="switch" name="switch" checked={switchDoor} onChange={handleSwitchChange} />
                    <label htmlFor="switch">Switch Doors</label>
                </div>
                <Button onClick={start} text="Start" />
            </div>
        </div>
    )
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default Simulator;

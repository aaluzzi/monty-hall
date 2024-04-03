import Button from "./Button";
import { useState, useEffect } from 'react';

function Simulator({ clickDoorElement, clickSwitchYesButton, clickSwitchNoButton, clickRestartButton }) {
    const [switchDoors, setSwitchDoors] = useState(false);
    const [iterationRunning, setIterationRunning] = useState(false);
    const [iterationCount, setIterationCount] = useState(0);
    const [iterationRuntime, setIterationRuntime] = useState(0);

    const start = () => {
        const totalRunningTime = 10000;
        const iterations = 30;
        setIterationCount(iterations);
        setIterationRuntime(totalRunningTime / iterations);
    }

    useEffect(() => {
        if (iterationCount > 0) {
            runIteration();
        }
        
    }, [iterationCount]);

    const runIteration = async () => {
        const selectedDoorIndex = Math.floor(Math.random() * 3);
        clickDoorElement(selectedDoorIndex);
        await delay(iterationRuntime / 3);
        if (switchDoors) {
            clickSwitchYesButton();
        } else {
            clickSwitchNoButton();
        }
        await delay(iterationRuntime / 3);
        clickRestartButton();
        await delay(iterationRuntime / 3);
        setIterationCount(count => count - 1);
    }

    const handleSwitchChange = () => {
        setSwitchDoors(!switchDoors);
    }

    return (
        <div className="flex flex-col bg-slate-800 p-4 rounded-lg gap-2">
            <h1 className="text-xl w-full">Simulator</h1>
            <div className="flex flex-col bg-slate-700 rounded-md p-4 gap-2">
                <div>
                    <input className="m-1" type="checkbox" id="switch" name="switch" checked={switchDoors} onChange={handleSwitchChange} />
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

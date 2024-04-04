import Button from './Button';
import { useState, useEffect } from 'react';

const TOTAL_RUNTIME = 10000;

function Simulator({ clickDoorElement, clickSwitchYesButton, clickSwitchNoButton, clickRestartButton }) {
	const [switchDoors, setSwitchDoors] = useState(false);
	const [iterationRunning, setIterationRunning] = useState(false);
	const [iterationCount, setIterationCount] = useState(0);
	const [iterationRuntime, setIterationRuntime] = useState(0);

    const toggle = () => {
        setIterationRuntime(TOTAL_RUNTIME / iterationCount);
        setIterationRunning(running => !running);
    }

	useEffect(() => {
		if (iterationRunning && iterationCount > 0) {
			runIteration();
		} else {
			setIterationRunning(false);
		}
	}, [iterationRunning, iterationCount]);

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
		setIterationCount((count) => count - 1);
	};

	const handleSwitchChange = () => {
		setSwitchDoors(!switchDoors);
	};

	return (
		<div className="flex flex-col bg-slate-800 p-4 rounded-lg gap-2">
			<div className="flex flex-col justify-start bg-slate-700 rounded-md p-4 gap-3">
				<div className="flex flex-col text-left">
					<label htmlFor="iterations">Iteration Count</label>
					<input
						className="bg-slate-600 p-2 rounded-md"
						type="number"
                        min="0"
                        max="100000"
                        id="iterations"
						name="iterations"
						value={iterationCount}
						onChange={(e) => setIterationCount(e.target.value < 99999 ? e.target.value : 99999)}
					/>
				</div>
				<div>
					<input
						className="m-1 p-2 bg-red-700 rounded"
						type="checkbox"
						id="switch"
						name="switch"
						checked={switchDoors}
						onChange={handleSwitchChange}
					/>
					<label htmlFor="switch">Switch Doors</label>
				</div>
				<Button onClick={toggle} text={!iterationRunning ? "Simulate" : "Stop"} />
			</div>
		</div>
	);
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export default Simulator;

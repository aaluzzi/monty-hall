import { useState } from 'react'
import Stats from './components/Stats'
import Door from './components/Door'
import Button from './components/Button'
import Simulator from './components/Simulator';

function App() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [status, setStatus] = useState("selecting");
  const [message, setMessage] = useState("One door contains a car. The other two have goats. Select a door.")
  const [doorsContents, setDoorsContents] = useState(getRandomDoorsContents());
  const [doorsOpened, setDoorsOpened] = useState([false, false, false]);
  const [selectedDoorIndex, setSelectedDoorIndex] = useState(-1);

  const restartGame = () => {
    setDoorsContents(getRandomDoorsContents());
    setSelectedDoorIndex(-1);
    setDoorsOpened([false, false, false]);
    setStatus('selecting')
    setMessage('One door contains a car. The other two have goats. Select a door.')
  }

  const onInitialDoorSelection = (index) => {
    setSelectedDoorIndex(index);
    openRandomGoatDoor(index)
    setStatus("switching");
    setMessage("Monty opened a door. Switch your selection to the other closed door?")
  }

  const openRandomGoatDoor = (playerDoorIndex) => {
    let goatDoorIndex = Math.floor(Math.random() * 3);
    while (goatDoorIndex == playerDoorIndex || doorsContents[goatDoorIndex] == "Car") {
      goatDoorIndex = Math.floor(Math.random() * 3);
    }
    const newDoorsOpened = [false, false, false];
    newDoorsOpened[goatDoorIndex] = true;
    setDoorsOpened(newDoorsOpened);
  }

  const switchSelection = () => {
    const otherClosedDoorIndex = getOtherClosedDoorIndex();
    console.log(selectedDoorIndex);
    //console.log(otherClosedDoorIndex);
    setSelectedDoorIndex(otherClosedDoorIndex);
    revealDoors(otherClosedDoorIndex);
  }

  const revealDoors = (finalDoorSelectionIndex) => {
    setDoorsOpened([true, true, true]);
    if (doorsContents[finalDoorSelectionIndex] === "Car") {
      setMessage("Car acquired! You win!");
      setWins(oldWins => oldWins + 1);
    } else {
      setMessage("You selected a goat. You lose.")
      setLosses(oldLosses => oldLosses + 1);
    }
    setStatus("ended");
  }

  const getOtherClosedDoorIndex = () => {
    let otherIndex = 0;
    while (otherIndex === selectedDoorIndex || doorsOpened[otherIndex]) {
      otherIndex++;
    }
    return otherIndex;
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <Stats wins={wins} losses={losses}/>
      <div className="flex gap-8 justify-center">
        <Door content={doorsContents[0]} selected={selectedDoorIndex == 0} select={selectedDoorIndex === -1 ? (() => onInitialDoorSelection(0)) : null} opened={doorsOpened[0]}/>
        <Door content={doorsContents[1]} selected={selectedDoorIndex == 1} select={selectedDoorIndex === -1 ? (() => onInitialDoorSelection(1)) : null} opened={doorsOpened[1]}/>
        <Door content={doorsContents[2]} selected={selectedDoorIndex == 2} select={selectedDoorIndex === -1 ? (() => onInitialDoorSelection(2)) : null} opened={doorsOpened[2]}/>
      </div>
      <h1 className="text-xl">{message}</h1>
      <div className="h-12 flex gap-3">
        {status === "switching" ? <Button onClick={switchSelection} text="Yes" /> : null}
        {status === "switching" ? <Button onClick={() => revealDoors(selectedDoorIndex)} text="No"/> : null}
        {status === "ended" ? <Button onClick={restartGame} text="Restart" /> : null}
      </div>
      <Simulator onInitialDoorSelection={onInitialDoorSelection} switchSelection={switchSelection} revealDoors={revealDoors} restartGame={restartGame} />
    </div>
  )
}

function getRandomDoorsContents() {
  const randIndex = Math.floor(Math.random() * 3)
  const doorsContents = ["Goat", "Goat", "Goat"];
  doorsContents[randIndex] = "Car";
  return doorsContents;
}

export default App;

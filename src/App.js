import './scss/Style.scss';
import {useState, useEffect} from "react";
import Confetti from 'react-confetti'
import Dice from "./Dice";
import { nanoid } from 'nanoid';

function App() {
const [dice, setDice] = useState(allNewDice());
const [trackRoll, setTrackRoll] = useState(0);
const [score, setScore] = useState(0)
const [tenzies, setTenzies] = useState(false);

useEffect(() => {

  const allHeld = dice.every(die => die.isHeld);
  const firstVal = dice[0].value;
  const allSameValue = dice.every(die => die.value === firstVal);
  if (allHeld && allSameValue) {
    setTenzies(true);
    setScore(prevScore => {
      if (prevScore === 0) return trackRoll;
      if (prevScore > trackRoll) return trackRoll;
      if (prevScore < trackRoll) return prevScore;
    });
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [dice]);


function generateNewDice() {
  return {
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid()
  }
}

 function allNewDice() {
  let newDice = [];
  for (let i = 0; i < 10; i++) {
    newDice.push(generateNewDice());
  }
  return newDice;
 }


 function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {
        ...die,
        isHeld: !die.isHeld
      }:
      die
    }))
 }
 
 
 function rollDice() {
   if (!tenzies) {
     setDice(oldDice => oldDice.map(die => {
       return die.isHeld ? die : generateNewDice() ;
      }));
      setTrackRoll(prevRoll => prevRoll + 1);
    } else {
      setTenzies(false);
      setTrackRoll(0);
      setDice(allNewDice());
    }
  }
  

 const diceElements = dice.map(die => <Dice key={die.id} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} value={die.value} />);


  return (
    <main>
    <div className="dice">
    {tenzies && <Confetti />}
   <h1 className="dice__title">Tenzies</h1>
   <p className="dice__desc">
   {!tenzies ? "Roll until all dice are the same. Click each die to freeze it at its current value between rolls." : "Click to start new game."}</p>
   <h3 className="dice__score">🏆 High Score: {score}</h3>
    <h3 className="dice__times">You rolled 🎲 {trackRoll} {trackRoll <= 1 ? "time" : "times"}</h3>
   <div className="dice__container">
    {diceElements} 
    </div>
   <button className="dice__roll" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </div>
    </main>
  )
}

export default App;

const dices = [
   [2],
   [3, 6],
   [1, 2, 7],
   [1, 3, 6, 7],
   [1, 2, 3, 6, 7],
   [1, 3, 4, 5, 6, 7],
]

function Dice(props) {
   const styles = {
      backgroundColor: props.isHeld ? "#d4a373" : "white"
   }

//   console.log(props.value - 1)

   const genDots = [1, 2, 3, 4, 5, 6, 7].map(dot => {
      let indexVal = props.value - 1;
      console.log(dices[indexVal]);
      return (
         <span
         key={dot}
         style={
            // {console.log(d)}
            dices[indexVal].includes(dot) ? {backgroundColor: "black"} : {backgroundColor: "transparent"}
         }
         ></span>
      );
   });

      return (
            <div className="dice__face" style={styles} onClick={props.holdDice}>
            {genDots}
            </div>
      )
}

export default Dice;
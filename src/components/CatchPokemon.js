import React from "react";
const DEFAULT_TRIES = 3;
const DEFAULT_RANGE = 10;
const DEFAULT_MIN = 0;

const CatchPokemon = () => {
const handleGameStart = () => {
    if(isPlaying) {
        throw Error("You are already playing");
    }
    const randomNumber = Math.random() * DEFAULT_RANGE + DEFAULT_MIN;
    setHiddenNumber(randomNumber);
    setTries(0);
    setIsPlaying(true);
    setIsWon(false);
    setIsLost(false);
    setGuess(-1);
}
const handleGuess = (event) => {
    event.preventDefault();
    if(guess == hiddenNumber && tries < 3) {
        setIsWon(true);
        setIsPlaying(false);

    } else if(tries == 2){
        setIsLost(true);
        setIsPlaying(false);
    } else {
        setTries(tries + 1);
    }
}
const [isPlaying, setIsPlaying] = React.useState(false);
const [guess, setGuess] = React.useState(-1);
const [isWon, setIsWon] = React.useState(false);
const [isLost, setIsLost] = React.useState(false);
const [tries, setTries] = React.useState(0);
const [hiddenNumber, setHiddenNumber] = React.useState(0);
if(isWon) {
    return (
        <div>
            Congratz you have won ! The hidden number is {hiddenNumber}
            <button onClick={handleGameStart}> Play Again </button>
        </div>
      );
}
if(isLost) {
    return (
        <div>
            Owh You lost! The hidden number is {hiddenNumber}
            <button onClick={handleGameStart}> Play Again </button>
        </div>
      );
}
if(isPlaying) {
    return (<div>
        Put in some number !
        Current Guess = {guess}
        current Tries = {tries}
        <form onSubmit={handleGuess}>
            <input
                type="number"
                onChange = {(e) => {setGuess(e.target.value)}}
            
            />
            <button type="submit">
                Guess
            </button>
      
        </form>
    </div>)
} else  {
    return (
        <div>
            Hello You can catch a pokemon here !
            <button onClick={handleGameStart}> Start Playing </button>
        </div>
      );
}

}
export default CatchPokemon;
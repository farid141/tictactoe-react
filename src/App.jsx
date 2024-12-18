import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import {WINNING_COMBINATIONS} from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'x';
  if(gameTurns.length > 0 && gameTurns[0].player == 'x')
    currentPlayer = 'o'

  return currentPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = [...initialGameBoard.map(innerArray=>[...innerArray])];

  // memanfaatkan render setelah update state gameTurns
  for (const turn of gameTurns) {
    const {square, player} = turn
    const {row, col} = square

    gameBoard[row][col] = player;
  }

  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstCombination = gameBoard[combination[0].row][combination[0].column]
    const secondCombination = gameBoard[combination[1].row][combination[1].column]
    const thirdCombination = gameBoard[combination[2].row][combination[2].column]

    if(firstCombination && firstCombination === secondCombination && firstCombination==thirdCombination){
      winner = firstCombination
    }
  }

  const hasDraw = gameTurns.length == 9 && !winner

  function handleRematch(){
    setGameTurns([]);
  }

  const handleSelectSquare = (rowIndex, colIndex)=>{
    setGameTurns(prevTurns => {
      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player:activePlayer}, 
        ...prevTurns
      ]
      return updatedTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="player 1" activePlayer="x" isActive={activePlayer=='x'??false}/>
          <Player name="player 2" activePlayer="o" isActive={activePlayer=='o'??false}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
        {(winner||hasDraw) && <GameOver winner={winner} handleRematch={handleRematch}/>}
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App

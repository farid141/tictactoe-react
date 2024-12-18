import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import {WINNING_COMBINATIONS} from "./winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

const PLAYERS = {
  'x': 'player 1',
  'o': 'player 2',
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'x';
  if(gameTurns.length > 0 && gameTurns[0].player == 'x')
    currentPlayer = 'o'

  return currentPlayer
}

function deriveWinner(gameBoard, playerNames) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstCombination = gameBoard[combination[0].row][combination[0].column]
    const secondCombination = gameBoard[combination[1].row][combination[1].column]
    const thirdCombination = gameBoard[combination[2].row][combination[2].column]

    if(firstCombination && firstCombination === secondCombination && firstCombination==thirdCombination){
      winner = playerNames[firstCombination];
    }
  }
  return winner
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAMEBOARD.map(innerArray=>[...innerArray])];

  for (const turn of gameTurns) {
    const {square, player} = turn
    const {row, col} = square

    gameBoard[row][col] = player;
  }
  return gameBoard
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState(PLAYERS);

  // memanfaatkan render setelah update state gameTurns
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, playerNames)
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

  const onNameChange = (symbol, name)=>{
    setPlayerNames(prevNames => {
      return {...prevNames, [symbol]: name}
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="player 1" symbol="x" onNameChange={onNameChange} isActive={activePlayer=='x'??false}/>
          <Player initialName="player 2" symbol="o" onNameChange={onNameChange} isActive={activePlayer=='o'??false}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
        {(winner||hasDraw) && <GameOver winner={winner} handleRematch={handleRematch}/>}
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'x';
  if(gameTurns.length > 0 && gameTurns[0].player == 'x')
    currentPlayer = 'o'

  return currentPlayer
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

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
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App

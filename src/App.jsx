import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('x');

  const handleSelectSquare = (rowIndex, colIndex)=>{
    setActivePlayer((currentPlayer)=>currentPlayer=='x'?'o':'x')
    setGameTurns(prevTurns => {
      let currentPlayer = 'x';
      if(prevTurns.length > 0 && prevTurns[0].player == 'x')
        currentPlayer = 'o'

      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player:currentPlayer}, 
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

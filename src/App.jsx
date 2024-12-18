import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState('x');
  const handleSelectSquare = ()=>{
    setActivePlayer((currentPlayer)=>currentPlayer=='x'?'o':'x')
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="player 1" activePlayer="x" isActive={activePlayer=='x'??false}/>
          <Player name="player 2" activePlayer="o" isActive={activePlayer=='o'??false}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} activePlayer={activePlayer}/>
      </div>
    </main>
  )
}

export default App

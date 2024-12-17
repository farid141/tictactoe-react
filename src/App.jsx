import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="player 1" symbol="x"/>
          <Player name="player 2" symbol="o"/>
        </ol>
        <GameBoard></GameBoard>
      </div>
    </main>
  )
}

export default App

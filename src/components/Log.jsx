export default function Log({ turns, playerNames }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row},${turn.square.col}`}>
          {playerNames[turn.player]} selected {turn.square.row},{" "}
          {turn.square.col}
        </li>
      ))}
    </ol>
  );
}

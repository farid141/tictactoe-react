import { useState } from "react";
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]
export default function GameBoard({onSelectSquare, activePlayer}) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    const handleSelectSquare = (rowIndex, colIndex)=>{
        setGameBoard((prevGameBoard)=>{
            // kita harus mengcopy array/obj karena sifatnya mutable, akan memodifikasi original var
            const gameBoard = [...prevGameBoard.map(innerArray=>[...innerArray])]
            gameBoard[rowIndex][colIndex]=activePlayer
            return gameBoard
        })
        onSelectSquare();
    }

    return <ol id="game-board">
        {gameBoard.map((row, rowIndex)=>(
            <li key={rowIndex}>
                <ol>
                {row.map((playerSymbol, colIndex)=>{
                    return(
                    <li key={colIndex}>
                        <button onClick={()=>handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                    </li>
                )})}
                </ol>
            </li>
        ))}
    </ol>
};

import { useState } from "react";
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]
export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);
    const handleSelectSquare = (rowIndex, colIndex, symbol)=>{
        setGameBoard((prevGameBoard)=>{
            // kita harus mengcopy array/obj karena sifatnya mutable, akan memodifikasi original var
            const gameBoard = [...prevGameBoard]
            gameBoard[rowIndex][colIndex]=symbol
            return gameBoard
        }
    )}

    return <ol id="game-board">
        {initialGameBoard.map((row, rowIndex)=>(
            <li key={rowIndex}>
                <ol>
                {row.map((playerSymbol, colIndex)=>(
                    <li key={colIndex}>
                        <button onClick={()=>handleSelectSquare(rowIndex, colIndex, 'x')}>{playerSymbol}</button>
                    </li>
                ))}
                </ol>
            </li>
        ))}
    </ol>
};

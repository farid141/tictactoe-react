import { useState } from "react";

export default function Player({name, activePlayer, isActive}) {
    const [isEditting, setIsEditting] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    const handleEditClick = () => {
        setIsEditting(!isEditting)
    }
    const handleNameChange = (e) =>{
        setPlayerName(e.target.value)
    }

    let nameHTML = <span className="player-name">{playerName}</span>
    if(isEditting)
        nameHTML = <input type="text" defaultValue={playerName} onChange={(e)=>handleNameChange(e)}/>

    return (
        <li className={isActive?'active':undefined}>
            <span className="player">
                {nameHTML}
              <span className="player-symbol">{activePlayer}</span>
            </span>
            <button onClick={handleEditClick}>{isEditting?'Save':'Edit'}</button>
          </li>
    )
};

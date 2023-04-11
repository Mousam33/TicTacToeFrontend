import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import GameBoard from "./GameBoard";
function Lobby({ username }) {
    const URL = "https://tictactoe.mousams.repl.co";
    const [initialized, setInitialized] = useState(false);
    const [boardInitialized, setBoardInitialized] = useState(false);
    const [opponent, setOpponent] = useState("");
    const [players, setPlayers] = useState([]);
    const [boardId, setBoardId] = useState(null);
    const registerPlayer = useCallback(async () => {
        await axios.get(URL, {params:{ name:username }})
    }, [username])
    const connect = async (player) => {
        await axios.patch(URL, 
            { name : username, 
              opponent : player })
        .then(response => {
            setBoardId(response.data);
            setBoardInitialized(true);
            setOpponent(player);
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
    }
    useEffect(() => {
        localStorage.setItem('username', JSON.stringify(username));
        registerPlayer().then(() => { setInitialized(true) })
        axios.get(URL + "/lobby")
        .then((response) => { console.log(response.data); setPlayers(response.data) })
        .catch((error) => console.log(error));
        const eventSource = new EventSource(URL + `/${ username }`);
        eventSource.onmessage = event => {
            if(!boardInitialized) setBoardId(event.data);
            setBoardInitialized(true);
            //console.log("Event Here");
            //console.log(event.data);
          };
          if(boardInitialized) eventSource.close();
    }, [initialized, boardInitialized, username, registerPlayer])
    return !boardInitialized ? (
        <div className="relative grid grid-cols-1 w-80 items-center text-center justify-center
        h-40 rounded-xl m-auto mt-10 ring-2 ring-slate-700 gap-4 ease-in-out transition-all">
        <div className="absolute inset-x-0 top-0 rounded-t-xl
        cursor-default select-none ring-2 ring-black">Players Online</div>
            <ul>
            {players.filter((player) => player !== username).map((player) => (
                <li key={player} onClick={ () => connect(player) } className="m-auto bg-cyan-600 w-full cursor-default ease-in-out transition-all
                ring-1 ring-black
                text-transparent bg-clip-text font-mono hover:bg-cyan-200 select-none" >
                    {player}
                </li>
            ))}
            </ul>
    </div>
    ) : <GameBoard board={ boardId } player = { username }/>
}
export default Lobby;
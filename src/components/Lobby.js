import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import GameBoard from "./GameBoard";
function Lobby({ username, setUser }) {
    const URL = "https://tictactoe.mousams.repl.co";//https://tictactoe.mousams.repl.co
    const [initialized, setInitialized] = useState(false);
    const [boardInitialized, setBoardInitialized] = useState(false);
    const [opponent, setOpponent] = useState("");
    const [players, setPlayers] = useState([]);
    const [boardId, setBoardId] = useState(null);
    const registerPlayer = useCallback(async () => {
        await axios.get(URL, {params:{ name:username }})
        .then(() => { setInitialized(true) }).catch((err) => {  setInitialized(true) })
    }, [username])
    const handleLogout = (event) => {
        localStorage.clear();
        setUser(null);
    }
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
        if(!initialized) registerPlayer();
        if(initialized) {
        axios.get(URL + "/lobby")
        .then((response) => { console.log(response.data); setPlayers(response.data) })
        .catch((error) => console.log(error));
        const eventSource = new EventSource(URL + `/${ username }`);
        eventSource.onmessage = event => {
            if(!boardInitialized) setBoardId(event.data);
            setBoardInitialized(true);
          };
          if(boardInitialized) eventSource.close();
        }
    }, [initialized, boardInitialized, username, registerPlayer])
    return initialized ? ( !boardInitialized ? (
        <>
        <button className="font-mono text-gray-300 ease-in-out transition-colors duration-700 h-20
        cursor-default select-none hover:text-black" onClick={ handleLogout }>logout</button>
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
    </div></>
    ) : 
    <GameBoard board={ boardId } player = { username }/>) : 
    (
        <div role="status" className="mt-20">
            <svg aria-hidden="true" className="inline w-28 h-28 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
}
export default Lobby;
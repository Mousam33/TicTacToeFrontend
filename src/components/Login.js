import { useState } from "react";
import Lobby from "./Lobby";

function Login() {
    const [user, setUser]   = useState(null);
    const [input, setInput] = useState("");
    return  user === null ? (
    <div className="relative grid grid-cols-1 w-80 items-center text-center justify-center
                             h-40 rounded-xl m-auto mt-10 ring-2 ring-slate-700 
                             ease-in-out transition-all">
        <div className="absolute inset-x-0 top-0 rounded-t-xl
                        cursor-default select-none ring-2 ring-black">TicTacToe</div>
        <input type='text' placeholder="Enter username" onChange={(e) => setInput(e.target.value)} 
        className="indent-5 rounded-xl m-auto cursor-default font-mono mt-16 ring-2 ring-black" required/>
        <button className="m-auto bg-cyan-600 rounded-xl w-20 cursor-default ease-in-out transition-all
                           text-transparent bg-clip-text font-mono hover:bg-cyan-200 select-none" 
                           onClick={() => { if(input.length > 0) setUser(input) } }>LOGIN</button>
    </div>) : (
    <Lobby username={ user } />
    );
 }

 export default Login;
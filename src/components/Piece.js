import { useState } from "react"

function Piece({ pieceSymbol, clicked }) { //turn, setTurn, index, dataHandler
    const [symbol, setSymbol] = useState("");
    const [active, setActive] = useState(true);
    const handleClick = () => {
        clicked();
    }
    return (
        <div className={`flex h-10 w-10 rounded-xl ring-2 ${symbol === "" ? "ring-black" : symbol === "X"? "ring-blue-600": "ring-red-600"}
                         text-center select-none ${symbol === "" ? "" : symbol === "X"? "text-blue-600": "text-red-600"}
                         font-mono cursor-default items-center justify-center font-bold
                         hover:ring-red-600`} 
              onClick={ handleClick }>
            { pieceSymbol }
        </div>
    )
}
export default Piece;
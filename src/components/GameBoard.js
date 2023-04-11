import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Piece from "./Piece";
function GameBoard({ board, player }) {
    const URL = "https://tictactoe.mousams.repl.co";
    const [boardData, setBoardData] = useState([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    const [closed, setClosed] = useState(false);

    const handleClick = useCallback(async (row, col) => {
      await axios.post(URL, {
        name: player,
        input: row + ","+ col,
        boardId: board.replace(/"/g, '')
      }).catch((err) => {console.log(err)})
    },[player, board, URL])

    useEffect(() => {
      console.log(player);
      const eventSource = new EventSource(URL + `/${ player }`);
      if(!closed) {
        eventSource.onmessage = event => {
          if(event.data !== "disconnect") {
            const data = JSON.parse(event.data);
            setBoardData(data.board);
            console.log("Board Here");
            console.log(data);
          } else { setClosed(true) }
        };
        if(closed) { eventSource.close(); }
      //  return () => {
      //    eventSource.close();
      //  };
    }
    }, []);


  
    return closed === false ? (
      <div className='flex w-screen h-screen justify-center items-center'>
      <div className="grid grid-cols-3 gap-2">
        {boardData.map((row, rowIndex) => (
            row.map((cell, cellIndex) => (
                <Piece pieceSymbol = {cell ? cell.pieceType : ' '} clicked = { () => handleClick(rowIndex, cellIndex) } />
            ))
        ))}
      </div>
      </div>
    ):(<> Game ended </>);
}
export default GameBoard;
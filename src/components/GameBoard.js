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

    const handleClick = useCallback(async (row, col) => {
      await axios.post(URL, {
        name: player,
        input: row + ","+ col,
        boardId: board.replace(/"/g, '')
      }).catch((err) => {console.log(err)})
    },[player, board, URL])

    useEffect(() => {
      console.log(player);
      //setBoardData(prevdata.board);
      //const eventSource = new EventSource(URL + `/subscribe?boardId=${ board.replace(/"/g, '') }`);
      const eventSource = new EventSource(URL + `/${ player }`);
      eventSource.onmessage = event => {
        const data = JSON.parse(event.data);
        setBoardData(data.board);
        console.log("Board Here");
        console.log(data);
      };
      //  return () => {
      //    eventSource.close();
      //  };
    }, []);

    const pieceType = (cell) => {
      if(cell === null) return ' ';
      return cell.pieceType;
    }
  
    return (
      <div className="grid grid-cols-3 gap-2">
        {boardData.map((row, rowIndex) => (
          //<div key={rowIndex}>
            row.map((cell, cellIndex) => (
              //<span key={cellIndex}>
                <Piece pieceSymbol = {cell ? cell.pieceType : ' '} clicked = { () => handleClick(rowIndex, cellIndex) } />
              //</span>
            ))
          //</div>
        ))}
      </div>
    );
}
export default GameBoard;
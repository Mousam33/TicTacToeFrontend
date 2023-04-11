import { useEffect, useState, useCallback } from "react";
import axios from "axios";
function GameBoard({ board, opponent }) {
    const URL = "https://tictactoe.mousams.repl.co";
    const [boardData, setBoardData] = useState({
        board: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      });

    useEffect(() => {
      const eventSource = new EventSource(URL + `/subscribe?boardId=${ board }`);
      eventSource.onmessage = event => {
        const data = JSON.parse(event.data);
        setBoardData(data.board);
      };
    //   return () => {
    //     eventSource.close();
    //   };
    }, []);
  
    return (
      <div>
        {boardData.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <span key={cellIndex}>
                {cell ? cell.pieceType : '-'}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
}
export default GameBoard;
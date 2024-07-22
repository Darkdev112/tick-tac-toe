import React, { useState, useMemo, useEffect } from 'react'
import Square from '../components/Square'
import styles from '../styles/Board.module.css'

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>("X")
  const [winner, setWinner] = useState<'X' | 'O' | null>(null);

  const reset = () : void => {
      setSquares(Array(9).fill(null));
      setWinner(null);
      setCurrentPlayer("X");
  }

  const setSquareValue = (index: number) => {
    const newData = squares.map((val, i) => {
      if (i == index) {
        return currentPlayer
      }
      return val;
    })
    setSquares(newData)
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
  }

  const isWinner = () => {
    let i : number =0, j : number =0;
    let matrix : ("X" | "O" | null)[][]=[];
    for(i=0;i<9;i+=3)
    {
      let arr : ("X" | "O" | null)[] = squares.slice(i,i+3);
      matrix.push(arr);
    }
    for(i=0;i<3;i++)
    {
      j=0;
      if(matrix[i][j]===matrix[i][j+1] && matrix[i][j+1]===matrix[i][j+2])
      {
        setWinner(matrix[i][j]);
        return;
      }
      if(matrix[j][i]===matrix[j+1][i] && matrix[j+1][i]===matrix[j+2][i])
      {
        setWinner(matrix[j][i]);
        return;
      }
    }
    if(matrix[0][0]===matrix[1][1] && matrix[1][1]===matrix[2][2])
    {
      setWinner(matrix[0][0]);
      return;
    }
    if(matrix[0][2]===matrix[1][1] && matrix[1][1]===matrix[2][0])
    {
      setWinner(matrix[1][1]);
      return;  
    }
  }

  const isNull = useMemo(() : boolean => {
    let flag=0;
    squares.map((val)=>{
      if(!val)
      {
          flag=1;
      }
    })
    return flag===0;
  },[squares])

  useEffect(() => {
    isWinner();
    console.log(isNull); 
  },[squares])
  
  return (
    <div className={styles.container}>
      {isNull? <p className={styles.para}>Draw!</p> : <p className={styles.para}>{winner ? "Congratulations " : "Hey "} <span className={((winner ? winner : currentPlayer) === "X") ? styles.spanbro : styles.spanbro2}>{winner ? winner : currentPlayer}</span>{!winner && " its your turn"}</p>}
      <div className={styles.gridbro}>
        {Array(9).fill(null).map((_, i) => {
          return (
            <Square
              winner={winner}
              key={i}
              onClick={() => setSquareValue(i)}
              value={squares[i]}
            />
          )
        }
        )}
      </div>
      <div className={styles.reset}>
        <button className={styles.resetbtn} onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default Board
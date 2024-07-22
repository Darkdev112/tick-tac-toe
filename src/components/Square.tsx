import React from 'react'
import styles from '../styles/Square.module.css' 

type SquareProps = {
  value : "X" | "O" | null,
  onClick : () => void,
  winner : "X" | "O" | null
}


const Square = ({value, onClick, winner} : SquareProps) => {
  return(
    <>
      {value ?  
      <button className={`${styles.buttonbro} ${value === "X" ? styles.spanbro : styles.spanbro2} text-[35px] `} disabled>{value}</button> 
      : 
      <button className={styles.buttonbro} onClick={onClick} disabled={Boolean(winner)}></button>}    
    </>
  )
}

export default Square
import React from 'react'
import styles from "./Button.module.css"

const Button = ({isOutline,text,image,...rest}) => {
  return (
    <button {...rest} className={isOutline?styles.outline_btn:styles.primary_btn}>{image}{text}
    </button>
  )
}
export default Button
import { FC } from "react"

interface ParagrafyProps{
    text?:string,
}

const Paragrafy:FC<ParagrafyProps> = ({text}) => {
  return (

    <p className='signin_controlinfo'>{text}</p>       
  )
}

export default Paragrafy

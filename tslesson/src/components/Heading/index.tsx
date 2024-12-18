import  { FC } from 'react'

interface HeadingProps{
    text:string,
    fontsize?:string
}

const Heading:FC<HeadingProps> = ({text,fontsize}) => {
  return (
    <h2 className='signin_name'>{text}</h2>
  )
}

export default Heading

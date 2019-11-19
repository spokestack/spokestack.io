import React, { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  large?: boolean
}

export default function Button({ large, ...props }: Props) {
  return <button className={`btn${large ? ' btn-large' : ''}`} {...props} />
}

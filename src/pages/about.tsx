import { navigate } from 'gatsby'
import { useEffect } from 'react'

export default function About(): null {
  useEffect(() => {
    navigate('/about/story/')
  }, [])
  return null
}

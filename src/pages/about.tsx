import { replace } from 'gatsby'
import { useEffect } from 'react'

export default function About(): null {
  useEffect(() => {
    replace('/about/story')
  }, [])
  return null
}

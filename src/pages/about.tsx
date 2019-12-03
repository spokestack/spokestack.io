import React, { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    window.location.href = '/about/story/'
  }, [])
  return <div />
}

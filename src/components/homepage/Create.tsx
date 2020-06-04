import BlueCard from '../BlueCard'
import React from 'react'

export default function Create() {
  return (
    <BlueCard
      button={
        <a href="/create" className="btn btn-primary">
          Get started
        </a>
      }
      id="create"
      title="Create a free Spokestack account"
      text={`Create an account to access our hosted services for model import,
        natural language processing, text-to-speech, and wakeword.`}
    />
  )
}

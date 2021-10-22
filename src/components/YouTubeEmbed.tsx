import React from 'react'

interface Props {
  title: string
  videoId: string
}

export default function YouTubeEmbed({ title, videoId }: Props) {
  return (
    <div
      className="youtube-video"
      style={{
        position: 'relative',
        // Set 16:9 ratio
        paddingBottom: `${(9 / 16) * 100}%`,
        height: 0
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        title={title}
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
      />
    </div>
  )
}

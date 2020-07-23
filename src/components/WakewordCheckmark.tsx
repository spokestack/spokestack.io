import React from 'react'

export default function Checkmark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="75"
      height="76"
      viewBox="0 0 75 76"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M37.5,74.5 C57.9345357,74.5 74.5,57.9345357 74.5,37.5 C74.5,17.0654643 57.9345357,0.5 37.5,0.5 C17.0654643,0.5 0.5,17.0654643 0.5,37.5 C0.5,57.9345357 17.0654643,74.5 37.5,74.5 Z"
        stroke="#2F5BEA"
        fillRule="nonzero"
      />
      <polygon
        fill="#2F5BEA"
        points="31.7897727 44.4247159 50.5823864 25.5894886 53.0965909 28.1036932 31.7897727 49.4105114 21.9034091 39.5241477 24.375 37.0099432"
      />
    </svg>
  )
}

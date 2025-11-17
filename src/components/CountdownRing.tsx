import React from 'react'

type Props = {
  size?: number
  stroke?: number
  total?: number
  remaining: number
}

export default function CountdownRing({ size = 48, stroke = 4, total = 30, remaining }: Props){
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const progress = Math.max(0, Math.min(1, remaining / total))
  const dashoffset = circumference * (1 - progress)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="countdown-ring">
      <defs>
        <linearGradient id="g1" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#0ea5a4" />
        </linearGradient>
      </defs>
      <g transform={`translate(${size/2}, ${size/2})`}>
        <circle r={radius} cx={0} cy={0} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={stroke} />
        <circle r={radius} cx={0} cy={0} fill="none" stroke="url(#g1)" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={dashoffset} style={{ transition: 'stroke-dashoffset 0.3s linear' }} transform={`rotate(-90)`} />
      </g>
    </svg>
  )
}

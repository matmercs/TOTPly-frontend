import React from 'react'

type Props = {
  size?: number
  stroke?: number
  total?: number
  remaining: number
}

export default function CountdownRing({ size = 56, stroke = 4, total = 30, remaining }: Props){
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  
  const progress = Math.max(0, Math.min(1, remaining / total))
  const dashoffset = circumference * (1 - progress)
  
  const isWarning = remaining <= 5;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <defs>
          <linearGradient id="pastel-gradient" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#e8d3f2" />
            <stop offset="100%" stopColor="#c9e4eb" />
          </linearGradient>
           <linearGradient id="warning-gradient" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#fca5a5" /> 
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        
        <circle 
            r={radius} 
            cx={size/2} 
            cy={size/2} 
            fill="none" 
            stroke="#f1f5f9" 
            strokeWidth={stroke} 
        />
        
        <circle 
            r={radius} 
            cx={size/2} 
            cy={size/2} 
            fill="none" 
            stroke={isWarning ? "url(#warning-gradient)" : "url(#pastel-gradient)"} 
            strokeWidth={stroke} 
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`} 
            strokeDashoffset={dashoffset} 
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }} 
        />
      </svg>
      
      <div className={`absolute inset-0 flex items-center justify-center font-mono font-bold text-sm ${isWarning ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}>
        {Math.ceil(remaining)}
      </div>
    </div>
  )
}

import React from 'react'
import { colors as themeColors } from '../styles/colors'

interface AuthDecorProps {
  variant?: 'login' | 'register'
}

export const AuthDecor: React.FC<AuthDecorProps> = ({ variant = 'login' }) => {

  const activeColors = variant === 'login'
    ? {
        primary: themeColors.purple,
        secondary: themeColors.blue,
        accent: themeColors.pink
      }
    : {
        primary: themeColors.yellowGreen,
        secondary: themeColors.blue,
        accent: themeColors.purple
      }

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center pointer-events-none select-none overflow-visible">
      <div 
        className="absolute w-[480px] h-[480px] rounded-full filter blur-[60px] animate-float"
        style={{ 
          background: activeColors.primary,
          opacity: 0.55, 
          top: '-5%',
          left: '-5%'
        }} 
      />
      
      <div 
        className="absolute w-[380px] h-[380px] rounded-full filter blur-[60px] animate-float-delayed"
        style={{ 
          background: activeColors.secondary,
          opacity: 0.55,
          bottom: '-5%',
          right: '-5%',
          animationDelay: '2s'
        }}
      />

      <div
        className="absolute w-[280px] h-[280px] rounded-full filter blur-[50px] animate-float-slow"
        style={{ 
          background: activeColors.accent,
          opacity: 0.5,
          top: '35%',
          left: '35%',
          animationDelay: '4s'
        }}
      />
    </div>
  )
}

import React from 'react'

interface AuthDecorProps {
  variant?: 'login' | 'register'
}

export const AuthDecor: React.FC<AuthDecorProps> = ({ variant = 'login' }) => {

  const colors = variant === 'login' 
    ? {
        
        primary: '#d8b4fe',   
        
        secondary: '#93c5fd', 
        
        accent: '#f9a8d4'     
      }
    : {
        
        primary: '#bbf7d0',   
        
        secondary: '#bfdbfe', 
        
        accent: '#e9d5ff'     
      }

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center pointer-events-none select-none overflow-visible">
      {}
      <div 
        className="absolute w-[480px] h-[480px] rounded-full filter blur-[60px] animate-float"
        style={{ 
          background: colors.primary,
          opacity: 0.45, 
          top: '-5%',
          left: '-5%'
        }} 
      />
      
      {}
      <div 
        className="absolute w-[380px] h-[380px] rounded-full filter blur-[60px] animate-float-delayed"
        style={{ 
          background: colors.secondary,
          opacity: 0.45,
          bottom: '-5%',
          right: '-5%',
          animationDelay: '2s'
        }} 
      />

      {}
      <div 
        className="absolute w-[280px] h-[280px] rounded-full filter blur-[50px] animate-float-slow"
        style={{ 
          background: colors.accent,
          opacity: 0.4,
          top: '35%',
          left: '35%',
          animationDelay: '4s'
        }} 
      />
    </div>
  )
}
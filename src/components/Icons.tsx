import React from 'react'

export function IconCopy(props: { className?: string }){
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} className={props.className}>
      <rect x="9" y="9" width="10" height="10" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

export function IconEdit(props: { className?: string }){
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} className={props.className}>
      <path d="M3 21v-3.75L14.06 6.19a1.5 1.5 0 0 1 2.12 0l1.63 1.63a1.5 1.5 0 0 1 0 2.12L6.75 21H3z" />
      <path d="M14.5 7.5l2 2" />
    </svg>
  )
}

export function IconDelete(props: { className?: string }){
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} className={props.className}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

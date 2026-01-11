import React from 'react'
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean
}
export function Card({
  children,
  className = '',
  noPadding = false,
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}
      {...props}
    >
      <div className={noPadding ? '' : 'p-5'}>{children}</div>
    </div>
  )
}
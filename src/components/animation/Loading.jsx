import React from 'react'

const Loading = ({text}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
        <div className="w-12 h-12 border-2 border-hudc-blue/20 border-t-hudc-blue rounded-full animate-spin" />
        <p className="font-mono text-[10px] text-hudc-blue uppercase tracking-widest animate-pulse">
          {text}
        </p>
      </div>
  )
}

export default Loading

import React from 'react'

function Avatar({children,py,px,backgroundColor,padding,color,borderRadius,fontSize,cursor}) {
   const style ={
    backgroundColor,
    padding: `${py} ${px}`,
    color: color || "black",
    borderRadius,
    fontSize,
    textAlign:"center",
    cursor:"pointer"|| null,
    textDecoration:"none"

   }

  return (
    <div style={style}>
         {children}
    </div>
  )
}

export default Avatar
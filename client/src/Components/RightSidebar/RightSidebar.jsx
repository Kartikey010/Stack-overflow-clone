import React from 'react'
import "./RightSidebar.css"
import Widget from './Widget'
import WidgetTags from './WidgetTags'

function RightSidebar() {
  return (
    <aside className='right-sidebar'>
       <Widget/>
       <WidgetTags />
    </aside>

  )
}

export default RightSidebar
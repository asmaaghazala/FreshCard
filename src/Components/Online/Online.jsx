import React from 'react'
import useOnline from '../../Hooks/useOnline'

export default function Online({children}) {
  let isOnline = useOnline()
  if(isOnline===true){
      return children 
  } 
}

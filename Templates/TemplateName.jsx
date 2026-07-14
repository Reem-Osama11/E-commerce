import React, { useEffect, useState } from 'react'

export default function Template() {

    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('Component mounted or updated')
    }, [count])

  return <>
    <p>You clicked  times</p>
   <h1>Count</h1>
  </>
}

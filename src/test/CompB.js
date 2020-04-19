import React from 'react'

export default function CompB(props) {
    return (
        <div>
            <p>Component B</p>
            {props.test}
            <button onClick={()=>props.changeTest('hello')}>change</button>
        </div>
    )
}

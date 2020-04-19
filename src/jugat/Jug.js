//jugat component
import React from 'react'
const Jug=({jugat,deleteJugat})=>{//these are props
    return(
      <div>
            <h1>{jugat.id}</h1>
            <p>{jugat.jugat}</p>
            <h3>{jugat.catagory}</h3> 
            <button onClick={()=>deleteJugat(jugat.id,jugat.jugat)}>x</button>
          </div>
    )
  }
  export default Jug
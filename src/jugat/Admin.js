 //admin component
 import React from 'react'
 import Jug from './Jug'
 import {fire} from '../config/Fire'
 const Admin=({cats,deleteCatagory,filteredJugat,deleteJugat,setJsearch,jSearch,updateCat,views})=>{
   
  return(
    <div>
      <h2>{views}</h2>
      <input type="text"placeholder="Search jugat"value={jSearch}onChange={(e)=>setJsearch(e.target.value)}/>
      {/* catagories in txt form with delete btn */}
      {cats.map((cat,i)=>{
              return <div key={i}>
                {cat.cat}
                <button onClick={()=>deleteCatagory(cat.cat,cat.id)}>x</button>
                <button onClick={()=>updateCat(i,cat.id)}>update</button>
              </div>
      })}
            {/* showing jugat and catagory with delete btn */}
            {filteredJugat.map((jugat,i)=>(
            <Jug key={i}jugat={jugat}deleteJugat={deleteJugat}/>
            ))}
        <button onClick={()=>fire.auth().signOut()}>Sign out</button>
    </div>
  )
}
export default Admin

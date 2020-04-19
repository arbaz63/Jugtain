//catagory component
import React from 'react'
const CatagoryForm=({addCatagory,cat,setCat})=>{
    return(
      <div>
        <form onSubmit={addCatagory}>
          <input type="text"placeholder="catagory"value={cat}onChange={(e)=>setCat(e.target.value)}/>
          <button>add</button>
        </form>
      </div>
    )
  }
  export default CatagoryForm
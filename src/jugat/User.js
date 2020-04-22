//user component
import React from 'react'
import '../styles/jugatApp.css'
import styled,{ThemeProvider} from 'styled-components'
const Body=styled.body`
  background-color:${(props)=>(props.theme.mode==='Dark Mode'?'black':'white')};
  color:${(props)=>(props.theme.mode==='Dark Mode'?'white':'black')};
`
//header component
const Header=({changeMode})=>{
  const [mode,setMode]=React.useState('Dark Mode')
  
  return(
    <div className='container'>
      <div className='row'>
        <div className='col-sm-10'>
          <h1>Jugtain v1.0</h1>
        </div>
        <div className='col-sm-2'>
          
          <div class="custom-control custom-switch">
  <input type="checkbox" class="custom-control-input" id="customSwitches"onChange={(e)=>{setMode(mode==='Light Mode'?'Dark Mode':'Light Mode'); changeMode(mode)}}/>
  <label class="custom-control-label" for="customSwitches"><h6>{mode}</h6></label>
</div>
          
        </div>
      </div>
    </div>
  )
}
//user component
const User=({jSearch,setJsearch,search,setSearch,renderOptions,jugtain,cats,setCats})=>{
  const [sortBy,setSortBy]=React.useState('date')
  const [selectedOption,setSelectedOption]=React.useState(undefined)
  const [visible,setVisible]=React.useState(3)
  const [toggle,setToggle]=React.useState('Light Mode')
  const display=(sorted)=>{
    const data=
     sorted.filter((jugat)=>jugat.catagory===search).slice(0,visible).map((jugat,i)=>{
       if(search==='No Catagory Selected'||search==='Show All'||search==='')
        return <p key={i}></p>
       else 
     return  jugat.catagory===search&&<div className='container main-jugat-row'><div className='row' key={i}><div className='col-sm-12'><h6>{jugat.jugat}</h6></div></div></div>
    })
    return data
  }
  //random jugat
  const randomJugat=()=>{
    let index=Math.floor(Math.random()* jugtain.length)
    const opt=jugtain[index].jugat
    setSelectedOption(opt)
    console.log(opt)
    return opt
}
  //load more 
  const loadMore=(prev)=>{
    setVisible(prev+2)
  }
  //load more1 
  const loadMore1=(i)=>{
    cats[i].visible=cats[i].visible+2
    setCats([...cats])
  }
  //dark mode and light mode
  const changeMode=(mode)=>
  {
    setToggle(mode)
    console.log(toggle)
    console.log(mode)
  }
    return(
      <ThemeProvider theme={{mode:toggle}}>
        
    <Body>
      <div>
        <div className='container'>
          <div className='row'>
            <Header changeMode={changeMode}/>
          </div>
          <div className='row'>
            {/* catagory dropdown */}
            <div className='col-sm-3'>
            <select className='browser-default custom-select' name="search"value={search}onChange={(e)=>{setSearch(e.target.value)}}>
                <option value="No Catagory Selected">No Catagory Selected</option>
                <option value="Show All">Show All</option>
                {renderOptions()}
              </select>
            </div>
            {/* filter */}
            <div className='col-sm-3'>
            <select className='browser-default custom-select'name='sortBy'value={sortBy}onChange={(e)=>setSortBy(e.target.value)}>
                <option value='date'>Date</option>
                <option value='name'>Name</option>
              </select>
            </div>
            {/* searchbox */}
            <div className='col-sm-6'>
            <input className='form-control' type="text"placeholder="Search jugat"value={jSearch}onChange={(e)=>setJsearch(e.target.value)}/>
            </div>
          </div>
          {/* random jugat */}
          <div className='row'>
            <div className='col'>
            <button className='btn btn-outline-info random btn-block' onClick={randomJugat}>
                <div className='row'>
                  <div className='col'>Random</div>
                </div>
                <div className='row'>
                  <div className='col'><h2>{selectedOption}</h2></div>
                </div>
              </button>
            </div>
          </div>
          {/* data */}
          <div className='row'>
            {sortBy==='name'?display(jugtain.sort((a,b)=>{
                  if(a.jugat.toLowerCase() < b.jugat.toLowerCase()) return -1;
                  if(a.jugat.toLowerCase() > b.jugat.toLowerCase()) return 1;
                  return 0;
                })):display(jugtain.sort((a,b)=>{
                  return a.date<b.date?1:-1
          }))}
                {visible<jugtain.filter((jugat)=>jugat.catagory===search).length&&<button className='btn btn-outline-info btn-sm btn-block'onClick={()=>loadMore(visible)}>Load More</button>}
                {/* jugat list with catagory heading */}
              {(search==='No Catagory Selected'||search===''||search==='Show All')&& cats.map((cat,i)=>{
                return jugtain.filter((jugat)=>jugat.catagory===cat.cat).length?<div className='container catagory-container'><div className='row catagory-heading'> <h4>{ cat.cat} ({jugtain.filter((jugat)=>jugat.catagory===cat.cat).length})</h4></div>{jugtain.filter((jugat)=>cat.cat===jugat.catagory).slice(0,cat.visible).map((jugat,ii)=>{
                return cat.cat===jugat.catagory&&<div className='row main-jugat-row' key={i}><div className='col-sm-12'> <h6>{jugat.jugat}</h6> </div></div>
                })}{cat.visible<jugtain.filter((jugat)=>jugat.catagory===cat.cat).length&&  <div className='row'> <button className='btn btn-outline-info btn-sm btn-block' onClick={()=>loadMore1(i)}>Load More</button></div>}
               
              </div>:''
            })}
          </div> 
        </div>
        
      </div>
      </Body>
      </ThemeProvider>
    )
  }
  export default User

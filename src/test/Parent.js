import React,{useState} from 'react'
import CompA from './CompA'
import CompB from './CompB'
import {Route,BrowserRouter,Switch,NavLink} from 'react-router-dom'
export default function Parent() {
    const [test,setTest]=useState('good morning')
    const help='help'
    const changeTest=(newTest)=>{
        setTest(newTest)
    }
    return (
        <div>
            <h1>{test}</h1>
            {/* <CompA/>
            <CompB/> */}
            
            <BrowserRouter>
            <div>
                <Link/>
                <Switch>
                    <Route path="/1"render={()=>(<CompA test={test}help={help}/>)}/>
                    <Route path="/2"render={()=>(<CompB test={test}changeTest={changeTest}/>)}/>
                </Switch>
            </div>
                
            </BrowserRouter>
            
        </div>
    )
}


const Link =()=> {
    return (
        <div>
            <NavLink to='/'>P</NavLink>
      <NavLink to='/1'>A</NavLink>
      <NavLink to='/2'>B</NavLink>
        </div>
    )
}

import React,{useState,useEffect} from 'react'
import {Route,BrowserRouter,Redirect} from 'react-router-dom'
import moment from 'moment';
import Admin from './Admin'
import User from './User'
import JugatForm from './JugatForm'
import CatagoryForm from './CatagoryForm'
import {fire,database} from '../config/Fire'

const Login=()=>{
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const login=()=>{
    fire.auth().signInWithEmailAndPassword(email,password).then((u)=>{})
  }
  const signUp=()=>{
    fire.auth().createUserWithEmailAndPassword(email,password).then((u)=>{})
  }
  return(
    <div>
      <input type='text'value={email}onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password"value={password}onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={login}>Login</button>
      <button onClick={signUp}>Sign up</button>
    </div>
  )
}
export const JugatApp=()=>{
    const [user,setUser]=useState({})
    // const jugatData=JSON.parse(localStorage.getItem('jugtain'))
    const [jugtain,setJugtain]=useState([])
    const [jugat,setJugat]=useState('')
    const [catagory,setCatagory]=useState('No Catagory Selected')//for dropdown
    const [date1,setDate]=useState(moment())//date of jugat
    const [id,setId]=useState('')
    const [cats,setCats]=useState([])//array
    const [cat,setCat]=useState('')//for input
    const [search,setSearch]=useState('')//catagory search
    const [jSearch,setJsearch]=useState('')
    const [act,setAct]=useState(0)
    const [index,setIndex]=useState(0)
    const [prevCat,setPrevCat]=useState('')//for jugat's prev catagory
    const date=date1.toString()//firebase can store dates only in strings
    const [findex,setFindex]=useState(0)
    const visible = 3;
    const [views,setViews]=useState(0)
    const authListener=()=>{
      fire.auth().onAuthStateChanged((user)=>{
        if(user)
        {
          setUser(user)
        }
        else{
          setUser(null)
        }
      })
    }
    const addJugat=(e)=>{
      e.preventDefault()
      if(jugat)
      {
          catagory!=='No Catagory Selected'&&
        setJugtain(
          [...jugtain,{jugat,catagory,date,id,findex}]
        )
        database.ref('jugtain').push({
          jugat,catagory,date,findex
        })
        setJugat('')
        setFindex(findex+1)
      }
    }
    const deleteJugat=(id,jug)=>{
      setJugtain(jugtain.filter((jugat)=>jugat.jugat!==jug))
      database.ref(`jugtain/${id}`).remove()
    }
    //catagory
    const addCatagory=(e)=>{
      e.preventDefault()
      if(act===0)
      {
          if(cat)
          {
            setCats([
              ...cats,{cat,visible:3}
            ])
            database.ref('catagories').push({
              cat,visible
            })
            // setCat('')
          }    
      }
      else{//update
        cats[index].cat=cat
        setCats([...cats])
        setAct(0)
        for(let i=0;i<jugtain.length;i++)
        {
          if(jugtain[i].catagory===prevCat)
          {
            jugtain[i].catagory=cat
            setJugtain([...jugtain])
          }
        }
      }
          }
    const updateCat=(i,id)=>{
      setCat(cats[i].cat)
      cats[i].cat=cat
      setCats([...cats])
      database.ref(`catagories/${id}/`).update({
        cat:cats[i].cat
      })
      
      setPrevCat(cat)
      setAct(1)
      setIndex(i)
    }
    const deleteCatagory=(cat,id)=>{
      setCats(cats.filter((cat1)=>cat1.cat!==cat))
      setJugtain(jugtain.filter((jugat)=>jugat.catagory!==cat))//delete jugtain in catagory that is deleted
      database.ref(`catagories/${id}`).remove()
    }
    //component did mount/update
    
    useEffect(()=>{
      const liked=localStorage.getItem('isLiked')
      database.ref('views').once('value')
      .then((snapshot)=>{
        const v=snapshot.val().Views
        setViews(v)
        database.ref('views').update({Views:v+1})
      })
      
       
      // localStorage.setItem('jugtain',JSON.stringify(jugtain))
      //get jugtain from firebase
      database.ref('jugtain').once('value')
      .then((snapshot)=>{
        const array=[]
        snapshot.forEach((childSnapshot)=>{
          array.push({
            id:childSnapshot.key,
            ...childSnapshot.val()
          })
        })
        setJugtain(array)
      })
      //get catagories from firebase
      database.ref('catagories').once('value')
      .then((snapshot)=>{
        const array=[]
        snapshot.forEach((childSnapshot)=>{
          array.push({
            id:childSnapshot.key,
            ...childSnapshot.val()
          })
        })
        setCats(array)
      })
       authListener()
    },[])
    
    const renderOptions=()=>{
      const data=cats.map((cat,i)=><option key={i}value={cat.cat}>{cat.cat}</option>)
      return data
    }
    let filteredJugat=jugtain.filter((jugat)=>{
      return jugat.jugat.toLowerCase().indexOf(jSearch.toLowerCase())!==-1
    })
    
    return(
      <div>
        <BrowserRouter>
               
            <div>
                <Route path='/admin'>{user?<Redirect to='/admin'/>:<Redirect to='/login'/>}</Route>
                {/* {user&& <Redirect to='/admin'/>} */}
                <Route path='/login'component={Login}/>
               
                <Route path="/admin"render={()=>(<JugatForm addJugat={addJugat}renderOptions={renderOptions}jugat={jugat}setJugat={setJugat}catagory={catagory}setCatagory={setCatagory}date={date1}setDate={setDate} cats={cats}id={id}setid={setId} />)}/>
                <Route path="/admin"render={()=>(<CatagoryForm addCatagory={addCatagory}cat={cat}setCat={setCat}/>)}/>
                <Route path="/admin"render={()=>(<Admin views={views}updateCat={updateCat} cats={cats}deleteCatagory={deleteCatagory}filteredJugat={filteredJugat}deleteJugat={deleteJugat}jSearch={jSearch}setJsearch={setJsearch}/>)}/> 
                
                <Route exact={true}path="/"render={()=>(<User jugtain={filteredJugat}cats={cats}setCats={setCats} search={search}setSearch={setSearch}jSearch={jSearch}setJsearch={setJsearch}renderOptions={renderOptions}/>)}/>
            </div>
                
        </BrowserRouter>
        
      </div>
    )
  }
  
  
  


  

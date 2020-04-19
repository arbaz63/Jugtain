import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
export default function PhotoDetails(props) {
    const [details,setDetails]=useState({})
    const {match}=props
    useEffect(()=>{
        axios.get(`https://jsonplaceholder.typicode.com/photos/${match.params.photo_id}`)
        .then((response)=>{
            setDetails(response.data)
        })
    })
    return (
        <div>
            <NavLink to='/'>Back</NavLink>
            <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{details.title}</span>
              <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
            </div>
            <div className="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
        </div>
    )
}

import React,{useEffect,useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
// import '../styles/materialize.css'
export default function PhotoList() {
    const [photos,setPhotos]=useState([])
    const [search,setSearch]=useState('')
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/photos')
        .then((response)=>{
            setPhotos(response.data.slice(0,10))
        })
    })
    const filterText=(e)=>{
        setSearch(e.target.value)
    }
    let filteredPhotos=photos.filter((photo)=>{
        return photo.title.indexOf(search)!==-1
    })
    return (
        <div>
            <div className="row">
                <input type="text" onChange={filterText}/>
            {filteredPhotos.map((photo)=>{
                return (
                          
                <div key={photo.id}className="col s4 m4">
                <div className="card">
                    <div className="card-image">
                    <img src={photo.thumbnailUrl} />
                <span className="card-title">{photo.title}</span>
                    </div>
                    <div className="card-content">
                    <p>I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively.</p>
                    </div>
                    <div className="card-action">
                    <NavLink to={`/${photo.id}`}>This is a link</NavLink>
                    </div>
                </div>
                </div>
              
                )
            }
            )}
            </div>
            
        </div>
    )
}

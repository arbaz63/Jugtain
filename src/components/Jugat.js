import React, { Component } from 'react'

export class Jugat extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             jugtain:[],
             catagories:[],
             newJugat:'',
             cat:'',
             selectedOption:'other',
             search:''
        }
    }
    onJugatChange=(e)=>{
        const newJugat=e.target.value
        this.setState(()=>({
            newJugat
        }))
    }
    onCatagoryChange=(e)=>{
        const newCatagory=e.target.value
        this.setState(()=>({
            newCatagory
        }))
    }
   onAdd=(e)=>{
       e.preventDefault()
       const obj={jugat:this.state.newJugat,category:this.state.selectedOption}
       this.setState(()=>({
           jugtain:this.state.jugtain.concat(obj)
       }))
   }
   //add catagory
   onCatChange=(e)=>{
       const cat=e.target.value
       this.setState(()=>({
           cat
       }))
   }
   onCatSubmit=(e)=>{
        e.preventDefault()
       const cat=this.state.cat
       this.setState(()=>({
           catagories:[...this.state.catagories,cat],
           cat:''
       }))   
   }
   onListChange=(e)=>{
       console.log(document.getElementById("my-list").value)
       const selectedOption=e.target.value
    this.setState(()=>({
        selectedOption
    }))
   }
   onSearchChange=(e)=>{
       const search=e.target.value
       this.setState(()=>({
           search
       }))
   }
    render() {
        return (
            <div>
                {/* add jugat */}
                <form onSubmit={this.onAdd}>
                    <input type="text"value={this.state.newJugat}onChange={this.onJugatChange}/>
                    <select id="my-list" defaultValue={this.state.selectedOption} onChange={this.onListChange}>
                        {this.state.catagories.map((cat)=><option value={cat}>{cat}</option>)}
                    </select>
                    <button>add</button>
                </form>
                {/* add catagories */}
                <form onSubmit={this.onCatSubmit}>
                    <input type="text"placeholder="catagory"value={this.state.cat}onChange={this.onCatChange}/>
                    <button>add</button>
                </form>
                <input type="text"placeholder="search"value={this.state.search}onChange={this.onSearchChange}/>
                {/* show records by searching by category*/}
                
                {
                    this.state.jugtain.map((item)=>{
                    return <h1>{item.category.toLowerCase().includes(this.state.search.toLowerCase())?item.jugat:''}</h1>
                    })
                }
                
                
            </div>
        )
    }
}

export default Jugat

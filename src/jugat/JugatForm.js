import React from 'react'
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize'
const JugatForm=({addJugat,jugat,setJugat,catagory,setCatagory,renderOptions,date,setDate})=>{
  const [focus,setFocus]=React.useState(false)
  const onDateChange = (date) => {
    if (date) {
      setDate(date)
    }
  };
  const onFocusChange = ({ focused }) => {
    setFocus(focused)
  };
    return(
      <div>
          <form onSubmit={addJugat}>
          <input type="text"placeholder="add jugat"value={jugat}onChange={(e)=>setJugat(e.target.value)}/>
          <select name="catagory"value={catagory}onChange={(e)=>{setCatagory(e.target.value)}}>
            <option value="no catagory">No Catagory Selected</option>
            {renderOptions()}
          </select>
          <SingleDatePicker
            date={date}
            onDateChange={onDateChange}
            focused={focus}
            onFocusChange={onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <button>add</button>
        </form>
      </div>
    )
  }
  export default JugatForm
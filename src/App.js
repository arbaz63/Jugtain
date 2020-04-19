import React from 'react'
// import './App.css'
import PhotoList from './components/PhotoList';
import {Route,BrowserRouter,Switch,NavLink} from 'react-router-dom'
import PhotoDetails from './components/PhotoDetails';
import { JugatApp } from './jugat/JugatApp';
import User from './jugat/User';
import Admin from './jugat/Admin';
import Parent from './test/Parent';
import CompA from './test/CompA';
import CompB from './test/CompB';
import './config/Fire'
import './bootstrap/bootstrap.min.css'
// import Form from './form/Form'
function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
            <div>
                <Switch>
                <Route path="/"component={JugatApp}exact={true}/>
                </Switch>
            </div>
                
        </BrowserRouter> */}
      <JugatApp/>
      {/* <Route path='/'component={JugatApp}exact={true}/> */}
      {/* <Parent/> */}
      
      {/* <Route path='/form'component={Form}/> */}
      {/* <Route path='/'component={JugatApp} exact={true}/>
      <Route path='/admin'component={Admin}/> */}
      {/* <PhotoList/>
      <Route path='/'component={PhotoList}exact={true}/>
      <Route path="/:photo_id"component={PhotoDetails}/> */}
    </div>
  );
}

export default App;

import React from 'react'
// import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
// import './App.css';
import Tracker from './Tracker'
import SearchBar from './SearchBar'
import NavBar from './NavBar'
import SignUp from './SignUp'
import Login from './Login'
import Profile from './Profile'
import BMR from './BMR'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      search: '',
      searchResults: {},
      chosenFood: {},
    }
  }

  // componentDidMount(){
  //   // array of food items
  //   fetch('https://trackapi.nutritionix.com/v2/search/instant?query=chorizo', {
  //     method: 'GET',
  //     headers: { 
  //       "x-app-id": 'ba42eace',
  //       "x-app-key": '1fbb199b1ef5a9e9f6feda6425f063f9',
  //     }
  //   })
  //   .then(res=>res.json())
  //   .then(data => console.log(data))
  // //common nutrients
  //   fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
  //     method: 'POST',
  //     headers: { 
  //       'Content-Type': 'application/json',
  //       "x-app-id": 'ba42eace',
  //       "x-app-key": '1fbb199b1ef5a9e9f6feda6425f063f9',
  //     },
  //     body: JSON.stringify({
  //       "query": 'chorizo'
  //     })
  //   })
  //   .then(res=>res.json())
  //   .then(data => console.log("nutrients?", data))
  //   //branded nutrients
  //   fetch('https://trackapi.nutritionix.com/v2/search/item?nix_item_id=51c3f29797c3e6de73cbd5ac', {
  //     method: 'GET',
  //     headers: { 
  //       "x-app-id": 'ba42eace',
  //       "x-app-key": '1fbb199b1ef5a9e9f6feda6425f063f9',
  //     }
  //   })
  //   .then(res=>res.json())
  //   .then(data => console.log( "Brand nutrients:", data))

  // }

  handleSearch = (search) => {
  
    console.log(this.state.search)
    this.setState({
      search
    })
    
    // if(e.target.value !== '' || null){
    // console.log(e.target.value)
    // fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${e.target.value}`, {
    //   method: 'GET',
    //   headers: { 
    //     "x-app-id": 'ba42eace',
    //     "x-app-key": '1fbb199b1ef5a9e9f6feda6425f063f9',
    //   }
    // })
    // .then(res=>res.json())
    // .then(searchResults => this.setState({
    //   searchResults
    // }))
    // console.log(this.state.searchResults)
    // } else{ return null }
  }

  handleFoodClick = () => {

  }

//   handleSignUp =(e, user) => {
//     e.preventDefault()
//     console.log(user)
//     let userObj = {
//       user: {
//         name: user.name,
//         email: user.email,
//         height: 0,
//         weight: 0,
//         password: user.password
//       }}
//     fetch('http://localhost:3000/api/v1/users', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json'
//   },
//   body: JSON.stringify(userObj)
// })
//   .then(r => r.json())
//   .then(console.log)

//   }

  render(){
  return (
    <BrowserRouter> 
    <div className="App">
      {/* hello Love */}
      <NavBar/>
      {/* <SearchBar handleSearch = {this.handleSearch} 
      searchResults = {this.state.searchResults}
      handleFoodClick= {this.handleFoodClick}
      /> */}
      <Switch>
        <Route path = '/signup' render={(routerProps)=> <SignUp {...routerProps} handleSignUp ={this.handleSignUp}/> }/>
        {/* <Route path = '/BMR'     */}
        <Route path ="/login"  component={Login} />
        <Route path='/tracker' component={Tracker} />
        <Route path='/BMR' component={BMR} />
        <Route render={() => <Redirect to={{pathname: "/tracker"}} />} />
      {/* <Tracker/> */}
      </Switch>
    </div>
    </BrowserRouter>
  );
  }
}

export default App;

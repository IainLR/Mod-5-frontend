import React from 'react'
import { Input, Button, Segment, Header } from 'semantic-ui-react'
import './Tracker.css'

const SearchBar = (props) => {
    let branded = props.searchResults.branded
    let common = props.searchResults.common
    return(
        <div>
            <Input onChange = {(e)=> props.handleSearch(e.target.value)} placeholder='Search...'/>
            <Button onClick = {()=>props.handleSearchClick()}>Search</Button>
            {/* <input
            type = "text"
            placeholder = {"Search Food Items..."}
            onChange = {(e)=> props.handleSearch(e.target.value)}
            /> */}
            <div className= 'container'> 
            <div>
            <Header as='h3'> Branded </Header>
                {branded ? 
                branded.map(food =>{

                    return <li style = {{width: '300', textDecoration: 'underline'}}
                    onClick = {() => props.handleBrandFoodClick(food)}>{food.food_name}, {food.brand_name_item_name} 
                     <img style = {{height: '20px'}} src = {food.photo.thumb}/> </li> 
                    //<li onClick = {() => props.handleBrandFoodClick(food)}>{food.food_name}, {food.brand_name_item_name} 
                    // <img style = {{height: '20px'}} src = {food.photo.thumb}/> </li> 
                    
                })
                : null}
            </div>
            <div>
            <Header as='h3'> Common </Header>
                {common ? common.map(food =>{

                    return <li style = {{width: '300', textDecoration: 'underline'}}
                    onClick = {() => props.handleCommonFoodClick(food)}>{food.food_name}, {food.brand_name_item_name} 
                     <img style = {{height: '20px'}} src = {food.photo.thumb}/> </li> 
                    //<li onClick = {() => props.handleBrandFoodClick(food)}>{food.food_name}, {food.brand_name_item_name} 
                    // <img style = {{height: '20px'}} src = {food.photo.thumb}/> </li> 
                    
                })
                : null}
            </div>
            </div>
        </div>
    )
}

export default SearchBar
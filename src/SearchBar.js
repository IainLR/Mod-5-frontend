import React from 'react'
import { Input, Button } from 'semantic-ui-react'

const SearchBar = (props) => {
    let branded = props.searchResults.branded
    return(
        <div>
            <Input onChange = {(e)=> props.handleSearch(e.target.value)} placeholder='Search...'/>
            <Button onClick = {()=>props.handleSearchClick()}>Search</Button>
            {/* <input
            type = "text"
            placeholder = {"Search Food Items..."}
            onChange = {(e)=> props.handleSearch(e.target.value)}
            /> */}
            <div>
                {branded ? branded.map(food =>{

                    return <li onClick = {() => props.handleBrandFoodClick(food)}>{food.food_name}, {food.brand_name_item_name} 
                    <img style = {{height: '20px'}} src = {food.photo.thumb}/> </li> 
                    
                })
                : null}
            </div>
        </div>
    )
}

export default SearchBar
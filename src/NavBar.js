import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import {  } from 'react-router-dom';

export class NavBar extends Component {


    state = { activeItem: 'Tracker' }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
       
        if (name === 'Log out'){
            console.log('I would like to log out')
            localStorage.clear()
            // this.props.history.push('/login')
            console.log('log out')
        }

        this.getProfile()
    }

    getProfile = () => {
        fetch('http://localhost:3000/api/v1/profile', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.token}` 
            }
        })
        .then(res => res.json())
        .then(console.log)
    }

    render() {
        const { activeItem } = this.state
        return (
            <div>
                
               
        <Segment color= 'orange' inverted>
        <Menu color = 'orange' inverted secondary>
          <Menu.Item
            name='Tracker'
            active={activeItem === 'Tracker'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Profile'
            active={activeItem === 'Profile'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Log out'
            active={activeItem === 'Log out'}
            onClick={this.handleItemClick}
          />
          
        </Menu>
      </Segment>
            </div>
        )
    }
}

export default NavBar

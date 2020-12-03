import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export class NavBar extends Component {


    state = { activeItem: 'Tracker' }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
       
        if (name === 'Log out'){
            console.log('I would like to log out')
            localStorage.clear()
            // this.props.history.push('/tracker')
            // this.props.history.push('/tracker')
        }

        this.getProfile()
    }

    handleLogoutClick = () => {
        console.log('click')
        localStorage.clear()
        // this.props.history.push('/tracker')
        // document.location.reload()
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
        <Link to = '/tracker' textAlign= 'center'>
          <Menu.Item
            name='Tracker'
            active={activeItem === 'Tracker'}
            onClick={this.handleItemClick}
          />
        </Link>
          <Link to = '/BMR' textAlign= 'center'>
          <Menu.Item
            name='BMR'
            active={activeItem === 'BMR'}
            onClick={this.handleItemClick}
          />
          </Link>
          <Link to = '/login' textAlign= 'center'>
          <Menu.Item
            name='Log out'
            active={activeItem === 'Log out'}
            onClick={this.handleLogoutClick}
          />
          </Link>
        </Menu>
      </Segment>
            </div>
        )
    }
}

export default NavBar

import React, { Component } from 'react'
import { Button, Form, Segment, Header } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import './Form.css';

export default class Login extends Component {
    state = {
        name: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.name && this.state.password){
        fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(userInfo => {
            localStorage.setItem('token', userInfo.token)
            // localStorage.token = userInfo.token
            if(localStorage.token === "undefined"){
                localStorage.clear()
                this.props.history.push('/login')
                console.log("no sign in", userInfo.error)
                alert(userInfo.error)
            }
            this.props.history.push('/tracker')
        })
         }else{
             return null
         }
        
    }

    render() {
        return (
            <div className = 'Form'> 
            <div className = 'Form_container'>
                {localStorage.token ? this.props.history.push('/tracker') : null}
            <Segment  className = 'Form' style={{width: '400px'}}> 
            <Header as='h2'>Login</Header>
            <Form>
             <Form.Field>
            <label>Username</label>
            <input placeholder='Username' name='name' onChange={(e) => this.handleChange(e)}/>
            </Form.Field>
            <Form.Field>
            <label>Password</label>
            <input onChange={(e) => this.handleChange(e)} name='password' type='password' placeholder='password' />
            </Form.Field>
            <Button type='submit' onClick={(e) => this.handleSubmit(e)} color='green'>Login</Button>
            </Form>
            <Link to = '/signup' textAlign= 'center'>New User?</Link>
            </Segment>
            
            </div>
            </div>
        )
    }
}

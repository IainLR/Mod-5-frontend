import React, { Component } from 'react'
import { Button, Checkbox, Form, Segment, Header } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import './Form.css';



export default class SignUp extends Component {
    state ={
        name: '',
        email: '',
        password: '',
    }

    handleChange = (e) => {
        let {value, name} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSignUp =(e, user) => {
        e.preventDefault()
        console.log(user)
        let userObj = {
          user: {
            name: user.name,
            email: user.email,
            height: 0,
            weight: 0,
            password: user.password
          }}
        fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(userObj)
    })
      .then(r => r.json())
      .then(data => {
        console.log(data)
        this.handleLogin(e)
      })
    //   this.props.history.push('/BMR')
      }

      handleLogin = (e) => {
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
                console.log("no sign in")
            }
            this.props.history.push('/BMR')
        })
         }else{
             return null
         }
        
    }
    
    render() {
        return (
            <div className = 'Form_container'>
                <Segment style={{width: '400px'}}>
                <Header as='h2'>Sign up</Header>
            <Form>
            <Form.Field>
            <label>Username</label>
            <input placeholder='Username' name='name' onChange={(e) => this.handleChange(e)}/>
            </Form.Field>
            <Form.Field>
            <label>Email</label>
            <input placeholder='Email' name='email' onChange={(e) => this.handleChange(e)}/>
            </Form.Field>
            <Form.Field>
            <label>Password</label>
            <input onChange={(e) => this.handleChange(e)} name='password' type='password' placeholder='password' />
            </Form.Field>
       
            <Button type='submit' onClick={(e) => this.handleSignUp(e, this.state)} color='green'>Sign up</Button>
      </Form>
      <Link to = '/login' textAlign= 'center'>Have an Account?</Link>
                </Segment>
                
            </div>
        )
    }
}

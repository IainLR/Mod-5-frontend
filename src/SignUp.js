import React, { Component } from 'react'
import { Button, Checkbox, Form, Segment } from 'semantic-ui-react'
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
      .then(console.log)
      this.props.history.push('/tracker')
      }
    
    render() {
        return (
            <div className = 'Form_container'>
                {/* <form onSubmit={(e) => this.handleSignUp(e, this.state)}>
                    <label> Username </label>
                    <input onChange={(e) => this.handleChange(e)} name='name' type='text'/>
                    <label> Email </label>
                    <input onChange={(e) => this.handleChange(e)} name='email' type='text'/>
                    <label> Password </label>
                    <input onChange={(e) => this.handleChange(e)} name='password' type='password'/>
                    <input type='submit'/>
                </form> */}
                <Segment style={{width: '400px'}}>
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
                </Segment>
                
            </div>
        )
    }
}

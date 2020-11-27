import React, { Component } from 'react'
import { Button, Checkbox, Form, Segment } from 'semantic-ui-react'
import './Form.css';

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]
  
export class BMR extends Component {

    render() {
        return (
            <div>
                    <Segment style={{width: '400px'}}>
            <Form>
            <Form.Field>
            <label>Username</label>
            <input placeholder=' Username' />
            </Form.Field>
            
          <Form.Select
            fluid
            label='Gender'
            options={options}
            placeholder='Gender'
          />
          <Form.Field>
            <label>Password</label>
            <input onChange={(e) => this.handleChange(e)} name='password' type='password' placeholder='password' />
            </Form.Field>
       
        <Form.Button>Submit</Form.Button>
      </Form>
                </Segment>
            </div>
        )
    }
}

export default BMR

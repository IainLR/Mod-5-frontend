import React, { Component } from 'react'
import { Button, Checkbox, Form, Segment, Input, Header, Select } from 'semantic-ui-react'
import './Form.css';

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]

export class BMR extends Component {

    state = {
        userId: 0,
        feet: 0,
        inches: 0,
        weight: 0,
        gender: '',
        calories: 0,
        age: 0
    }

    componentDidMount(){
        if(localStorage.length === 0 || localStorage.token === "undefined"){
            this.props.history.push('/login')
        } else {
            fetch('http://localhost:3000/api/v1/profile', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.token}` 
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                userId: data.user.id,
            })
        })
        }
    }

    selectHandler = (e, data) => {
        console.log(data.value);
        this.setState({ gender: data.value });
    }

    calculate = () => {
        let height = (parseInt(this.state.feet) * 12) + parseInt(this.state.inches)
        console.log(parseInt(height), height)
        if(this.state.gender === 'male' || this.state.gender === 'other'){
            let calories = 66 + (6.23 * parseInt(this.state.weight)) + (12.7 * height) - (6.8 * parseInt(this.state.age))
            console.log(calories)
            this.setState({
                calories
            })
          
        }else{
            let calories = 655 + (4.35 * this.state.weight) + (4.7 * height) - (4.7 * this.state.age)
            console.log(calories)
            this.setState({
                calories
            })
        }
    
    }

    changeHandler = (e) => {
        let {name, value} = e.target
        console.log(name, value)
        this.setState({
            [name]:parseInt(value)
        })
    }

    saveGoal = () => {
        if(this.state.calories === 0 ){
            alert('Please calculate your BMR')
        }else{
            fetch('http://localhost:3000/api/v1/goals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${localStorage.token}` 
                }, 
                body: JSON.stringify({
                    goal: {
                        user_id: this.state.userId, 
                        weight_goal: 0,
                        rate_of_loss: 0,
                        daily_calories: this.state.calories
                    }
                })
            })
            .then(res => res.json())
            .then(console.log)
            this.props.history.push('/tracker')
        }
        console.log('click, let us make a goal')
    }

    render() {
        return (
            <div>
            <div className = 'Form_container'>
            <Segment style={{width: '400px'}}>
            <Header as='h2'>BMR calculator</Header>
            <Form>
            <Form.Field>
            <label>age</label>
            <Input
            onChange = {(e) => this.changeHandler(e)}
            placeholder='Enter age...'
            name = 'age'
            />
            </Form.Field>
            <label>Height</label>
            <Form.Group widths='2'>
            <Form.Field>
            <Input
            onChange = {(e) => this.changeHandler(e)}
            label={{ basic: true, content: 'ft' }}
            labelPosition='right'
            placeholder='feet'
            name = 'feet'
            />
            </Form.Field>
            <Form.Field>
            <Input
            onChange = {(e) => this.changeHandler(e)}
            label={{ basic: true, content: 'in' }}
            labelPosition='right'
            placeholder='inches'
            name = 'inches'
            />
            </Form.Field>
            </Form.Group>
            <Form.Field>
            <label>Weight</label>
            <Input
            onChange = {(e) => this.changeHandler(e)}
            label={{ basic: true, content: 'lbs' }}
            labelPosition='right'
            placeholder='Enter weight...'
            name = 'weight'
            />
            </Form.Field>
          <Form.Select
          onChange = {this.selectHandler}
            fluid
            label='Gender'
            options={options}
            placeholder='Gender'
            name = 'gender'
          /> 

       
        <Form.Button 
        onClick = {this.calculate}
        >Calculate</Form.Button>
      </Form>
                </Segment>
                
    
            </div>
            <div className = 'Form_container'>
         <Segment className = 'Form_container' style={{width: '400px'}}>
            <Header as='h3'> BMR: {Math.round(this.state.calories)} calories</Header>
        </Segment>
         </div>
         <div className = 'Form_container'>
         <Button color='green' active = {false} 
         onClick ={this.saveGoal}
         >Save</Button>
         </div>
            </div>
        )
    }
}

export default BMR

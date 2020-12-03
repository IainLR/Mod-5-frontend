import React from 'react'
import './Tracker.css'
import { Progress } from 'semantic-ui-react'
import { Button, Card, Icon, Segment, Header } from 'semantic-ui-react'
import SearchBar from './SearchBar'
import NavBar from './NavBar'
import Chart from './Chart'


export default class Tracker extends React.Component {
    state = {
        searchEnabled: false,
        pageModifier: 0,
        date: '',
        month: 0,
        shortMonth: '',
        daysInMonth: 0,
        year: 0,
        userId: 0,
        mealId: 0,
        userData: {},
        userMeals: [],
        mealString: '',
        breakfast: [],
        breakfastCal: [],
        lunch: [],
        lunchCal: [],
        dinner: [],
        dinnerCal: [],
        snacks: [],
        snacksCal: [],
        search: '',
        searchResults: {},
        chosenFood: {},
        fat: 0,
        carbs: 0,
        protein: 0,
        totalMacros: 0,
        calorieBudget: 0,
        caloriesConsumed: 0
    }

    componentDidMount(){
        if(localStorage.length === 0 || localStorage.token === "undefined"){
            this.props.history.push('/login')
        } else {
    
           // let d = new Date()
           // let shortMonth = d.toLocaleString('en-us', { month: 'short' });
           // let year = d.getYear()
           // let month = d.getMonth() + 1
           // let daysInMonth = this.getDaysInMonth(month, 2020)
           // console.log(d.getMonth(), d.getDate(), 'month date experiment', daysInMonth, shortMonth)

        let today = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())
        let month = today.getMonth() + 1
        let shortMonth = today.toLocaleString('en-us', { month: 'short' });
        let year = today.getFullYear()
        let daysInMonth = this.getDaysInMonth(month, year)
        let date = String(today).split(' ')
        let displayDate = date[0] + ' ' + date[1] + ' ' + (parseInt(date[2]) - this.state.pageModifier)
        let saveDate = date[1] + ' ' + parseInt(date[2])
        console.log('days in month & month', daysInMonth, month, shortMonth)

        this.setState({
            date: saveDate,
            month,
            shortMonth,
            daysInMonth,
            year
        })
        fetch('http://localhost:3000/api/v1/profile', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.token}` 
            }
        })
        .then(res => res.json())
        .then(data => {
            let calorieBudget = data.user.goal ? data.user.goal.daily_calories : 1950
            this.setState({
                userId: data.user.id,
                userData: data,
                calorieBudget
            })
            let dateArr = data.user.meals.map(meal => meal.date)
            console.log(dateArr)
            if(dateArr.includes(this.state.date)){
                let mealObj = data.user.meals.find(obj => obj.date === this.state.date)
                // console.log(mealObj, "is this the meal?")
                this.setState({
                    mealId: mealObj.id
                })
                this.fetchFood()
            }else{
                console.log('make a new meal! handleStartTrack()')
                this.handleStartTrack(saveDate)
            }
            
            
        })
        }
    }

    fetchFood = () => {
        fetch(`http://localhost:3000/api/v1/meals/${this.state.mealId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.token}` 
            }
        })
        .then(res => res.json())
        .then(meal => {
            console.log(meal.foods)
            let breakfast = meal.foods.filter(food => food.blds === 'breakfast')
            let lunch = meal.foods.filter(food => food.blds === 'lunch')
            let dinner = meal.foods.filter(food => food.blds === 'dinner')
            let snacks = meal.foods.filter(food => food.blds === 'snacks')
            let carbArr = meal.foods.map(food => food.carbs)
            let fatArr = meal.foods.map(food => food.fat)
            let proteinArr = meal.foods.map(food => food.protein)
            let calArr = meal.foods.map(food => food.calories)
            let caloriesConsumed = calArr.reduce(function(a, b){
                return a + b;
            }, 0);
            let carbs = carbArr.reduce(function(a, b){
                return a + b;
            }, 0);
            let fat = fatArr.reduce(function(a, b){
                return a + b;
            }, 0);
            let protein = proteinArr.reduce(function(a, b){
                return a + b;
            }, 0);
            let totalMacros = carbs + fat + protein
        

           this.setState({
               breakfast,
               lunch,
               dinner,
               snacks,
               fat,
               carbs,
               protein,
               totalMacros,
               caloriesConsumed
              
           })
        })
    }

    newEntry = () => {
        console.log('we want to make a new day to edit, this will post')
    }

    handleClick = (e, meal) => {
        console.log('click', meal)
        this.setState({
            searchEnabled: !this.state.searchEnabled,
            mealString: meal
        })
    }

    handleSearch = (search) => {
  
        console.log(this.state.search)
        this.setState({
          search
        })
        // if(search !== '' || null){
        //     console.log(search)
        //     fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${search}`, {
        //       method: 'GET',
        //       headers: { 
        //         "x-app-id": 'ba42eace',
        //         "x-app-key": '1fbb199b1ef5a9e9f6feda6425f063f9',
        //       }
        //     })
        //     .then(res=>res.json())
        //     .then(searchResults => this.setState({
        //       searchResults
        //     }))
        //     console.log(this.state.searchResults)
        //     } else{ return null }
    }

    handleSearchClick = () => {
        console.log('click', this.state.search)
        if(this.state.search !== '' || null){
        console.log(this.state.search)
        fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${this.state.search}`, {
          method: 'GET',
          headers: { 
            "x-app-id": 'ba42eace',
            "x-app-key": '1fbb199b1ef5a9e9f6feda6425f063f9',
          }
        })
        .then(res=>res.json())
        .then(searchResults => this.setState({
          searchResults
        }))
        console.log(this.state.searchResults)
        } else{ return null }
      }
      
    storeFood = (foodObj) => {
        console.log('we want to display!', foodObj)

        let calories = foodObj.foods[0].nf_calories
        let name = foodObj.foods[0].food_name
        let blds = this.state.mealString
        let carbs = foodObj.foods[0].nf_total_carbohydrate
        let fat = foodObj.foods[0].nf_saturated_fat
        let protein = foodObj.foods[0].nf_protein
        let revisedObj = {
            food: {
                calories,
                name,
                blds,
                carbs,
                fat,
                protein,
                meal_id: this.state.mealId
            }
        }

        // switch(this.state.mealString){
        //     case 'breakfast':
        //         return this.setState({
        //             breakfast: [...this.state.breakfast, foodObj],
        //             caloriesConsumed: this.state.caloriesConsumed + foodObj.foods[0].nf_calories
        //         })
                
        //     case 'lunch':
        //          return this.setState({
        //             lunch: [...this.state.lunch, foodObj],
        //             caloriesConsumed: this.state.caloriesConsumed + foodObj.foods[0].nf_calories
        //         })
                
        //     case 'dinner':
        //          return this.setState({
        //             dinner: [...this.state.dinner, foodObj],
        //             caloriesConsumed: this.state.caloriesConsumed + foodObj.foods[0].nf_calories
        //         })
                
        //     case 'snacks':
        //          return this.setState({
        //             snacks: [...this.state.snacks, foodObj],
        //             caloriesConsumed: this.state.caloriesConsumed + foodObj.foods[0].nf_calories
        //         })
              
                
        // }
        this.saveToMeal(revisedObj)
    }

    saveToMeal = (food) => {
        console.log(food, 'lets make this save food!')
        fetch('http://localhost:3000/api/v1/foods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${localStorage.token}` 
            }, 
            body: JSON.stringify(food)
        })
        .then(res => res.json())
        .then(food => {
            switch(food.blds){
            case 'breakfast':
                return this.setState({
                    breakfast: [...this.state.breakfast, food],
                    caloriesConsumed: this.state.caloriesConsumed + food.calories,
                    fat: this.state.fat + food.fat,
                    carbs: this.state.carbs + food.carbs,
                    protein: this.state.protein + food.protein,
                    totalMacros: this.state.totalMacros + food.fat + food.carbs + food.protein
                })
                
            case 'lunch':
                 return this.setState({
                    lunch: [...this.state.lunch, food],
                    caloriesConsumed: this.state.caloriesConsumed + food.calories,
                    fat: this.state.fat + food.fat,
                    carbs: this.state.carbs + food.carbs,
                    protein: this.state.protein + food.protein,
                    totalMacros: this.state.totalMacros + food.fat + food.carbs + food.protein
                })
                
            case 'dinner':
                 return this.setState({
                    dinner: [...this.state.dinner, food],
                    caloriesConsumed: this.state.caloriesConsumed + food.calories,
                    fat: this.state.fat + food.fat,
                    carbs: this.state.carbs + food.carbs,
                    protein: this.state.protein + food.protein,
                    totalMacros: this.state.totalMacros + food.fat + food.carbs + food.protein
                })
                
            case 'snacks':
                 return this.setState({
                    snacks: [...this.state.snacks, food],
                    caloriesConsumed: this.state.caloriesConsumed + food.calories,
                    fat: this.state.fat + food.fat,
                    carbs: this.state.carbs + food.carbs,
                    protein: this.state.protein + food.protein,
                    totalMacros: this.state.totalMacros + food.fat + food.carbs + food.protein
                })
            }
        })
    }


    saveFood = () => {
        console.log('save!?')
    }

    deleteFood = (food) => {
        console.log('click and delete', food)
        let {id, calories, fat, carbs, protein} = food
        console.log(id, calories)

        fetch(`http://localhost:3000/api/v1/foods/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(() => {
            this.setState({
                caloriesConsumed: this.state.caloriesConsumed - calories,
                fat: this.state.fat - fat,
                carbs: this.state.carbs - carbs,
                protein: this.state.protein - protein,
                totalMacros: this.state.totalMacros - fat - carbs - protein
            })
            switch(food.blds){
                case 'breakfast':
                    return this.setState({
                        breakfast: [...this.state.breakfast].filter(f => f.id !== food.id)
 
                    })
                case 'lunch':
                     return this.setState({
                        lunch: [...this.state.lunch].filter(f => f.id !== food.id)
                       
                    })
                    
                case 'dinner':
                     return this.setState({
                        dinner: [...this.state.dinner].filter(f => f.id !== food.id)
                        
                    })
                    
                case 'snacks':
                     return this.setState({
                        snacks: [...this.state.snacks].filter(f => f.id !== food.id)
                       
                    })
                }
            
        })
    }

    handleBrandFoodClick = (food) => {
        console.log('click', food)
        fetch(`https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${food.nix_item_id}`, {
        method: 'GET',
        headers: { 
            "x-app-id": 'ba42eace',
            "x-app-key": '1fbb199b1ef5a9e9f6feda6425f063f9',
        }
        })
        .then(res=>res.json())
        .then(chosenFood => {
            console.log( "Brand nutrients:", chosenFood)
            this.setState({chosenFood})
            this.storeFood(chosenFood)
            
        })
    }

    handleCommonFoodClick = (food) => {
        console.log('click', food)
        // fetch(`https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${food.nix_item_id}`, {
        // method: 'GET',
        // headers: { 
        //     "x-app-id": 'ba42eace',
        //     "x-app-key": '1fbb199b1ef5a9e9f6feda6425f063f9',
        // }
        // })
        // .then(res=>res.json())
        // .then(chosenFood => {
        //     console.log( "Brand nutrients:", chosenFood)
        //     this.setState({chosenFood})
        //     this.storeFood(chosenFood)
            
        // })
          fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
            method: 'POST',
             headers: { 
               'Content-Type': 'application/json',
               "x-app-id": 'ba42eace',
               "x-app-key": '1fbb199b1ef5a9e9f6feda6425f063f9',
             },
             body: JSON.stringify({
               "query": food.food_name
             })
           })
           .then(res=>res.json())
           .then(chosenFood => {
               console.log("nutrients?", chosenFood)
                this.setState({chosenFood})
                this.storeFood(chosenFood)
            })
    }

    handleStartTrack = (date) => {
        console.log('click start', date)

        let mealObj = {
            meal: {
                date
            }
        }
        fetch('http://localhost:3000/api/v1/meals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${localStorage.token}` 
            }, 
            body: JSON.stringify(mealObj)
        })
        .then(res => res.json())
        .then(meal => {
            this.setState({mealId: meal.id})
            this.makeMealPlan(meal)
        })
    }

    makeMealPlan = (meal) => {
        console.log('inside make meal function')
        let mpObj = {
            meal_plan: {
                user_id: this.state.userId,
                meal_id: meal.id
            }
        }
        console.log('inside make meal plan')
        fetch('http://localhost:3000/api/v1/meal_plans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${localStorage.token}` 
            }, 
            body: JSON.stringify(mpObj)
        })
        .then(res => res.json())
        .then(data => {
            console.log("SUCCESS?!", data)
        })
    }

    getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate()
    }

    monthString = (monthInt) => {
        let shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return shortMonths[monthInt - 1 ]

    }

    handleBackButton = (e) => {
        console.log(this.state.date, e.target.name)
        // let d = new Date()
        // let shortMonth = d.toLocaleString('en-us', { month: 'short' });
        // let month = d.getMonth() + 1
        // let daysInMonth = this.getDaysInMonth(month, 2020)
        // console.log(d.getMonth(), d.getDate(), 'month date experiment', daysInMonth, shortMonth)

        let dateStringArr = this.state.date.split(' ')
        let dayInt = parseInt(dateStringArr[1])
        console.log(dateStringArr, dayInt)
        console.log(this.state.userData)
       
        if(e.target.name === 'back'){
            if ((dayInt - 1) === 0){
                let month = this.state.month - 1 === 0 ? 12 : this.state.month - 1
                let daysInMonth = this.getDaysInMonth(month, this.state.year)
                let shortMonth = this.monthString(month)
                let date = shortMonth+ ' ' + daysInMonth
                console.log(date, daysInMonth, month, shortMonth)
                this.setState({ 
                    date,
                    shortMonth,
                    month,
                    daysInMonth
                 })
                this.profileFetch()
            }else{
                let date = String(dateStringArr[0] + ' ' + (dayInt - 1))
                console.log(date)
                this.setState({ date })
                this.profileFetch()
            }
        } else{
            if((dayInt + 1) > this.state.daysInMonth){
                let month = this.state.month + 1 === 13 ? 1 : this.state.month + 1
                let daysInMonth = this.getDaysInMonth(month, this.state.year)
                let shortMonth = this.monthString(month)
                let date = shortMonth+ ' ' + '1'
                console.log(month)
                this.setState({ 
                    date,
                    shortMonth,
                    month,
                    daysInMonth
                 })
                this.profileFetch()
            }else{
            let date = String(dateStringArr[0] + ' ' + (dayInt + 1))
           console.log(date)
           this.setState({ date })
           this.profileFetch()
            }
        }
        
    }

    profileFetch = () => {
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
                userData: data
               
            })
            let dateArr = data.user.meals.map(meal => meal.date)
            console.log(dateArr)
            if(dateArr.includes(this.state.date)){
                let mealObj = data.user.meals.find(obj => obj.date === this.state.date)
                // console.log(mealObj, "is this the meal?")
                this.setState({
                    mealId: mealObj.id
                })
                this.fetchFood()
            }else{
                console.log('make a new meal! handleStartTrack()')
                this.setState({
                    breakfast: [],
                    lunch: [],
                    dinner: [],
                    snacks: [],
                    fat: 0,
                    carbs: 0,
                    protein: 0,
                    totalMacros: 0,
                    caloriesConsumed: 0
                })
                this.handleStartTrack(this.state.date)
            }
            
            
        })
    }
    

    render(){
        
        let displayDate = this.state.date
        return (
        
    <div>
        {/* <NavBar/> */}
        <Segment className = 'date'>
        
        <Button onClick={(e) => this.handleBackButton(e)}
        content='Next' icon='right arrow' labelPosition='right' floated='right' name ='next' />
        <Button onClick={(e) => this.handleBackButton(e)}
        content='back' icon='left arrow' labelPosition='left' floated='left' name ='back'/>
            <div className= 'container'>
            <Header as='h2'>{displayDate}</Header>
            </div>
        </Segment>
        <Segment className = 'date'>
                 <Progress percent={(this.state.caloriesConsumed / this.state.calorieBudget) * 100} 
                 success={this.state.caloriesConsumed < this.state.calorieBudget ? true : false}>
        {this.state.caloriesConsumed}/{this.state.calorieBudget} Calories
                </Progress>
        </Segment>
    <div className= 'container'>
        {!localStorage.token ? this.props.history.push('/login') : null}
                
            {/* <Card.Group> */}
            
    <Card.Group>
    <Card>
      <Card.Content>
        <Icon
          floated='right'
          size='mini'
        />
        <Card.Header>Breakfast
        {/* {this.state.breakfast.length > 0 ? 
          this.state.breakfast.map(foodObj => {
              let breakArr = []
            //   console.log(foodObj.foods[0].food_name)
             breakArr.push(foodObj.foods[0].nf_calories)
          })
        : null} */}
        </Card.Header>
        <Card.Meta>Start Tracking!</Card.Meta>
        <Card.Description>
          {this.state.breakfast.length > 0 ? 
          this.state.breakfast.map(foodObj => {
            //   console.log(foodObj.foods[0].food_name)
         return  <Segment 
         
        //  onClick = {() => this.deleteFood(foodObj)}
         secondary> {foodObj.name} {foodObj.calories}  
         <a>
         <Icon
         onClick = {() => this.deleteFood(foodObj)}
         style={{position: 'absolute', right: 0}}
         floated='right'
        //  size='mini'
        name='x'
       /> 
       </a>
       </Segment>
        //  <li onClick = {() => this.deleteFood(foodObj)}> {foodObj.name} {foodObj.calories} </li>
          })
        : null}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='orange' onClick={(e) => this.handleClick(e, 'breakfast')}>
            Add Food
          </Button>
          {/* <Button basic color='red'>
            Decline
          </Button> */}
        </div>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Icon
          floated='right'
          size='mini'
         
        />
        <Card.Header>Lunch</Card.Header>
        <Card.Meta>Start Tracking!</Card.Meta>
        <Card.Description>
        {this.state.lunch.length > 0 ? 
          this.state.lunch.map(foodObj => {
            //   console.log(foodObj.foods[0].food_name)
         return  <Segment  secondary 
         > {foodObj.name} {foodObj.calories} 
         <a>
         <Icon
         onClick = {() => this.deleteFood(foodObj)}
         style={{position: 'absolute', right: 0}}
         floated='right'
        //  size='mini'
        name='x'
       /> 
       </a>
         </Segment>
          })
        : null}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='orange' onClick={(e) => this.handleClick(e, 'lunch')}>
            Add Food
          </Button>
          {/* <Button basic color='red'>
            Decline
          </Button> */}
        </div>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Icon
          floated='right'
          size='mini'
         
        />
        <Card.Header>Dinner</Card.Header>
        <Card.Meta>Start Tracking!</Card.Meta>
        <Card.Description>
        {this.state.dinner.length > 0 ? 
          this.state.dinner.map(foodObj => {
            //   console.log(foodObj.foods[0].food_name)
         return  <Segment secondary 
         onClick = {null}> {foodObj.name} {foodObj.calories}
         <a>
         <Icon
         onClick = {() => this.deleteFood(foodObj)}
         style={{position: 'absolute', right: 0}}
         floated='right'
        //  size='mini'
        name='x'
       /> 
       </a>
          </Segment>
          })
        : null}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='orange' onClick={(e) => this.handleClick(e, 'dinner')}>
            Add Food
          </Button>
          {/* <Button basic color='red'>
            Decline
          </Button> */}
        </div>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Icon
          floated='right'
          size='mini'
         
        />
        <Card.Header>Snacks</Card.Header>
        <Card.Meta>Start Tracking!</Card.Meta>
        <Card.Description>
        {this.state.snacks.length > 0 ? 
          this.state.snacks.map(foodObj => {
            //   console.log(foodObj.foods[0].food_name)
         return  <Segment secondary
         onClick = {null}> {foodObj.name} {foodObj.calories} 
         <a>
         <Icon
         onClick = {() => this.deleteFood(foodObj)}
         style={{position: 'absolute', right: 0}}
         floated='right'
        //  size='mini'
        name='x'
       /> 
       </a>
         </Segment>
          })
        : null}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='orange' onClick={(e) => this.handleClick(e, 'snacks')}>
            Add Food
          </Button>
          {/* <Button basic color='red'>
            Decline
          </Button> */}
        </div>
      </Card.Content>
    </Card>
    </Card.Group>
                </div>
            {/* <Segment>
            <div className= 'container'> */}
            {/* <Button onClick = {this.saveFood} color='green'>Save</Button> */}
            {/* <Button  onClick = {() => this.handleStartTrack(saveDate)}>Start Tracking</Button> */}
            {/* </div>
        </Segment> */}
        <Segment className= 'container' style ={{width: '400px'}}>
       
            <div className= 'container'>
            <Header as='h4'>Daily Macronutrients in Grams</Header>
            <Chart fat={this.state.fat} carbs={this.state.carbs} protein={this.state.protein} totalMacros={this.state.totalMacros}/>
            </div>
        </Segment>
    
                
            <Segment style={{ display: this.state.searchEnabled ? "block" : "none" }}>
                <div>
                    <SearchBar handleSearch = {this.handleSearch}
                    handleSearchClick = {this.handleSearchClick} 
                    searchResults = {this.state.searchResults}
                    handleBrandFoodClick= {this.handleBrandFoodClick}
                    handleCommonFoodClick= {this.handleCommonFoodClick}
                    />
                </div>
            </Segment>
            
            </div>
        )
    }
}
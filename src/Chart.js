import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

export class Chart extends Component {
    constructor(){
        super()
        this.state = {
            chartData: {
                labels: ['Fats', 'Protein', 'Carbohydrates'],
                datasets: [
                    {
                        label: 'Grams',
                        data: [
                        //  this.props.fat,
                        //  this.props.protein,
                        //  this.props.carbs
                        // this.props.fat
                        ], 
                        backgroundColor: [

                        ]
                    }
                ]
            }
        }
    }

    render() {
        
        return (
            <div>
                <Doughnut 
                data={{
                    labels: ['Fats', 'Protein', 'Carbohydrates'],
                    datasets: [
                        {
                            label: 'Grams',
                            data: [
                            this.props.fat ,
                            this.props.protein,
                            this.props.carbs,
                            ], 
                            backgroundColor: [
                                // 'rgba(54, 162, 235, 0.6)',
                                // 'rgba(75, 192, 192, 0.6)',
                                // 'rgba(255, 99, 132, 0.6)'
                                'rgba(14, 145, 140)',
                                'rgba(246, 131, 15)',
                                'rgba(187, 34, 5)'
                            ]
                        }
                    ]
                }} 
                options={{
                    // title: {
                    //     display: true,
                    //     text: 'Macro Nutrients in Grams',
                    //     fontSize: 10
                    // }
                 }}
                />
            </div>
        )
    }
}

export default Chart

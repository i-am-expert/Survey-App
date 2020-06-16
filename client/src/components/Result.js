import React, { Component } from 'react';
import axios from 'axios';
import { Bar, defaults } from 'react-chartjs-2';

defaults.global.defaultFontFamily = 'Lato';
defaults.global.defaultFontSize = 18;
defaults.global.defaultFontColor = '#777';
defaults.scale.ticks.min = 0;

export class Result extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            selected: '',
            countValues: [],
            chartData: {}
        }
    }

    getLabels() {
        let arr = [];
        // console.log(this.state.countValues)
        this.state.countValues.map(obj => {
            if(obj.choice === 'c') {
                arr.push('C');
            } else if(obj.choice === 'c++') {
                arr.push('C++');
            } else if(obj.choice === 'java') {
                arr.push('Java');
            } else if(obj.choice === 'python') {
                arr.push('Python');
            }
            // arr.push(obj.choice);
        })
        return arr;
    }

    getData() {
        let arr = [];
        // console.log(this.state.countValues)
        this.state.countValues.map(obj => {
            arr.push(obj.countVal);
        })
        return arr;
    }

    getChartData() {
        this.setState({
            chartData: {
                labels: this.getLabels(),
                datasets: [ 
                    {
                        data: this.getData(),
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(153, 102, 255, 0.6)'
                        ],
                        borderWidth:1,
                        borderColor:'#777',
                        hoverBorderWidth:3,
                        hoverBorderColor:'#000'
                    }
                ]
            }
        })
    }

    componentDidMount() {
        const parameters = window.location.pathname.substring(8,);
        const arr = parameters.split('/');
        if(arr[1] === 'c') {
            arr[1] = 'C';
        } else if(arr[1] === 'c++') {
            arr[1] = 'C++';
        } else if(arr[1] === 'java') {
            arr[1] = 'Java';
        } else if(arr[1] === 'python') {
            arr[1] = 'Python';
        }
        this.setState({
            email: arr[0],
            selected: arr[1]
        })
        
        axios.get(`http://localhost:5000/options/values`)
        .then(res => {
            const arrData = res.data;
            this.setState({
                countValues: arrData
            }, () => {
                this.getChartData()
            })
        })
        .catch(err => console.log(err));
    }
    
    render() {
        return (
            <div className="container" style={{width: "40%", margin: "auto", marginTop: "7%", marginBottom: "5%"}}>
                <div className="bg-dark text-center container card card-body text-white">
                    <p style={{marginBottom: "0.3rem"}}>Your Email - {this.state.email}</p>
                    <p>You Selected - {this.state.selected}</p>
                </div>
                <br /> <br />
                <Bar
                    data={this.state.chartData}
                    options={{
                        title: {
                          display: true,
                          text: 'Favorite Programming Languages (Global)',
                          fontSize: 22,
                          padding: 30
                        },
                        legend: {
                          display: false,
                        },
                        tooltips: {
                            enabled: true,
                            titleFontSize: 16,
                            bodyFontSize: 16,
                        }
                    }}
                    height={300}
                    width={300}
                />
            </div>
        )
    }
}

export default Result

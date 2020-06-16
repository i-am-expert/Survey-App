import React, { Component } from 'react';
import axios from 'axios';

export class Question extends Component {
    constructor(props) {
        super(props)
    }

    handleClick = (e) => {
        e.preventDefault();
        const selected = e.target.id;
        const email = window.location.pathname.substring(14,);
        const option = {
            email: email,
            choice: selected
        }
        axios.post(`http://localhost:5000/options/add/${email}`, option)
        .then(res => {
            console.log(res.data);
            window.location = `/result/${email}/${selected}`;
        })
        .catch(err => console.log(err));

        // window.location = `/result/${email}/${selected}`;
    }
    
    render() {
        return (
            <div className="container" style={{width: "40%", margin: "auto", marginTop: "7%"}}>
                <div className="bg-dark text-center container card card-body text-white">
                    <h5>Instructions</h5>
                    <p>This is a basic survey on favorite programming language.</p>
                </div>
                <br /> <br />
                <div style={{textAlign: "center"}}>
                    <p style={{fontSize: "2rem"}}>Select your favorite programming language!</p>
                </div>
                <br />
                <div style={{display: "flex"}}>
                    <button id="c" style={btnStyle} type="button" className="btn btn-secondary" onClick={this.handleClick}>C</button>
                    <button id="c++" style={btnStyle} type="button" className="btn btn-secondary" onClick={this.handleClick}>C++</button>
                </div>
                <br />
                <div style={{display: "flex"}}>
                    <button id="java" style={btnStyle} type="button" className="btn btn-secondary" onClick={this.handleClick}>Java</button>
                    <button id="python" style={btnStyle} type="button" className="btn btn-secondary" onClick={this.handleClick}>Python</button>
                </div>
            </div>
        )
    }
}

const btnStyle = {
    width: "50%",
    marginLeft: "5%",
    marginRight: "5%"
}

export default Question

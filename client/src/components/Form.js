import React, { Component } from 'react';
import axios from 'axios';

export class Form extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: ''
        }
    }
    
    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const email = this.state.email;
        const email_ = {
            email: email
        }

        axios.get(`http://localhost:5000/users/`+email)
        .then(res => {
            console.log(res.data);
            if(res.data.length) {
                console.log("Exists");
                document.getElementById("message-div").style.display = "block";
                document.getElementById("email").value = "";
            } else {
                console.log("Absent");
                axios.post(`http://localhost:5000/users/${email}`, email_)
                .then(res => console.log(res.data))
                .catch(err => console.log(err));

                window.location = '/users/' + email;
            }
        })
        .catch(err => console.log(err));

        // axios.post(`http://localhost:5000/users/${email}`, email_)
        // .then(res => console.log(res.data))
        // .catch(err => console.log(err));

        // window.location = '/users/' + email;
    }

    render() {
        return (
            <div className="container" style={{width: "40%", margin: "auto", marginTop: "7%"}}>
                <div style={{textAlign: "center"}}>
                    <h1>SURVEY - PROGRAMMING</h1>
                </div>
                <br />
                <div id="message-div" className="alert alert-danger" style={{textAlign: "center", alignContent: "center", display: "none"}}>
                        <p id="message">You have already submitted your response!</p>
                </div>
                <form onSubmit={this.onSubmit} autoCorrect="off" autoComplete="off">
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            spellCheck="false"
                            value={this.state.email}
                            onChange={this.onChangeEmail} 
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <br />
                    <div style={{textAlign: "center"}}>
                        <button type="submit" className="btn btn-primary">Get Verification Code</button>
                    </div>
                    <br /> <br />
                    <div className="bg-dark text-center container card card-body text-white">
                        <h5>Instructions</h5>
                        <p>Please enter valid email address. If you enter invalid address, you will not recieve verification code.</p>
                    </div>
                </form>
            </div>
        )
    }
}

export default Form;

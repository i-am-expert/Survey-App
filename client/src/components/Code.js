import React, { Component } from 'react';
import axios from 'axios';

export class Code extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             code: '',
             userObj: {}
        }
    }

    // componentDidMount() {
    //     const email = window.location.pathname.substring(7,);
    //     setTimeout(() => {
    //         axios.get(`http://localhost:5000/users/`+email)
    //         .then(res => {
    //             this.setState({
    //                 userObj: res.data
    //             })
    //             console.log(this.state.userObj[0].code);
    //         })
    //         .catch(err => console.log(err));
    //     }, 3000);
    // }

    onChangeCode = (e) => {
        this.setState({
            code: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const code = this.state.code;
        const email = window.location.pathname.substring(7,);
        axios.get(`http://localhost:5000/users/`+email)
        .then(res => {
            this.setState({
                userObj: res.data
            })
            if(code == this.state.userObj[0].code) {
                console.log('Code Matched!')
            } else {
                console.log('Code not matched!');
                document.getElementById("message").innerHTML = "Incorrect Code! Please Try Again!";
                document.getElementById("message-div").classList.add("alert-danger");
                document.getElementById("message-div").classList.remove("alert-primary");
                document.getElementById("code").value = "";
            }
            console.log(this.state.userObj[0].code);
        })
        .catch(err => console.log(err));
    }
    
    render() {
        return (
            <div className="container" style={{width: "50%", margin: "auto", marginTop: "10%"}}>
                <form onSubmit={this.onSubmit} autoCorrect="off" autoComplete="off">
                    <div id="message-div" className="alert alert-primary" style={{textAlign: "center", alignContent: "center"}}>
                        <p id="message">Verification Code has been sent to your email!</p>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="email">Enter Verification Code</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="code" 
                            value={this.state.code}
                            onChange={this.onChangeCode} 
                        />
                    </div>
                    <br />
                    <div style={{textAlign: "center"}}>
                        <button type="submit" className="btn btn-primary">Submit Code</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Code

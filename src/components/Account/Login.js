import React, { Component } from "react";
import './Account.css';
// import { Button, TextField, Box, Paper } from '@material-ui/core';
// import Alert from '@material-ui/lab/Alert';

class Login extends Component {
  constructor(props){
      super(props);
      this.state = {
          username: '',
          password: '',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = 'Login - Big Fun';
  }

  handleChange(e){
      this.setState({[e.target.id]: e.target.value});
  }
    
  handleSubmit(e){
      e.preventDefault();
      if(this.state.username.match("^[a-zA-Z0-9]{1,20}$") != null && this.props.login(this.state.username, this.state.password)){
        // <Alert severity="success">{ this.state.username } + " logged in successfully"</Alert>
        // alert(this.state.username + " logged in successfully");
        // window.location.href = "/home";
      }
      else {
        alert("Login error");
      }
  }
  
  render() {
      
    return (
    <div className="centerBox">
      <img className='loginLogo' src={'/img/icon-circle.png'} alt="Big Fun Logo"/>
      <h1 className='headingText'>Login to Big Fun</h1>
      <form name='registerForm' onSubmit={this.handleSubmit}>
        <input required id='username' class='loginBox' placeholder='Username' type='text' value={this.state.username} onChange={this.handleChange.bind(this)} />
        <br/>
        <input required id='password' class='loginBox' placeholder='Password' type='password' value={this.state.password} onChange={this.handleChange.bind(this)} />
        <br/>
        <button id='submit' type="submit" className='submitButton'>Login</button>
        <div>
          <p><a className='quickLink' href='/createaccount'>Create account</a></p>
        </div>
      </form>
    </div>
    );
  }

}

export default Login;

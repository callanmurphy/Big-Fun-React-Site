import React, { Component } from "react";
import './Login.css';
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
      if(this.state.username.match("^[a-zA-Z0-9]{1,20}$") != null){
        // <Alert severity="success">{ this.state.username } + " logged in successfully"</Alert>
        // alert(this.state.username + " logged in successfully");
        this.props.login(this.state.username, this.state.password)
        window.location.href = "/home";
      }
      else {
        alert("Login error");
      }
  }
  
  render() {
      
    return (
    <div className="centerBox">
    {/* <Paper variant="prop" className='centerText' elevation={3}> */}
      <img className='loginLogo' src={'/img/icon-circle.png'} alt="Big Fun Logo"/>
      <h1 className='headingText'>Login to Big Fun</h1>
      <form name='registerForm' onSubmit={this.handleSubmit}>
        {/* <TextField required label='Username' id='username' value={this.state.username} onChange={this.handleChange.bind(this)} /> */}
        <input required id='username' placeholder='Username' type='text' value={this.state.username} onChange={this.handleChange.bind(this)} />
        {/* <TextField required label='Password' id='password' type='password' value={this.state.password} onChange={this.handleChange.bind(this)} /> */}
        <br/>
        {/* <Button variant="contained" className='submitButton' type="submit" color='primary'>Login</Button> */}
        <input required id='password' placeholder='Password' type='password' value={this.state.password} onChange={this.handleChange.bind(this)} />
        <br/>
        <button id='submit' type="submit" className='submitButton'>Login</button>
        <div>
          <p><a className='quickLink' href='/createaccount'>Create account</a></p>
        </div>
      </form>
    {/* </Paper> */}
    </div>
    );
  }

}

export default Login;

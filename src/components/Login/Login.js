import React, { Component } from "react";
import './Login.css';
import { Button, TextField, Box, Paper } from '@material-ui/core';


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
      alert(this.state.username + " logged in successfully");
      this.props.login(this.state.username, this.state.password)
      window.location.href = "/home";
  }

  render() {
      
    return (
    <div className="centerBox centerText">
    {/* <Paper variant="prop" className='centerText' elevation={3}> */}
      <img className='loginLogo' src={'/img/icon-circle.png'} alt="Big Fun Logo"/>
      <h1>Login</h1>
      <form name='registerForm' onSubmit={this.handleSubmit}>
        <TextField label='Username' id='username' value={this.state.username} onChange={this.handleChange.bind(this)} />
        <br/>
        <TextField label='Password' id='password' type='password' value={this.state.password} onChange={this.handleChange.bind(this)} />
        <br/><br/><br/><br/>
        <Button variant="contained" type="submit" color='secondary'>Login</Button>
      </form>
    {/* </Paper> */}
    </div>
    );
  }

}

export default Login;

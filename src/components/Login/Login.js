import React, { Component } from "react";
import './Login.css';

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
    <div class='centerText centerBox'>
      <h1>Login</h1>
      <form name='registerForm' onSubmit={this.handleSubmit}>
        <input type="text" id='username' placeholder='Username' value={this.state.username} onChange={this.handleChange.bind(this)} />
        <br/>
        <input type="password" id='password' placeholder='Password' value={this.state.password} onChange={this.handleChange.bind(this)} />
        <br/><br/>
        <input type="submit" class='submitButton' value="Login"/>
      </form>
    </div>
    );
  }

}

export default Login;

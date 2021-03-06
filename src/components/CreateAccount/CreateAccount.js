import React, { Component } from "react";
import './CreateAccount.css';

class CreateAccount extends Component {
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
    document.title = 'Create Account - Big Fun';
  }

  handleChange(e){
      this.setState({[e.target.id]: e.target.value});
  }
    
  handleSubmit(e){
      e.preventDefault();
      alert("Account successfully created for: " + this.state.username);
      window.location.href = "/";
  }

  render() {
      
    return (
    <div class='centerBox centerText'>
      <h1>Create Account</h1>
      <form name='registerForm' onSubmit={this.handleSubmit}>
        <input type="text" id='username' placeholder='Username' value={this.state.username} onChange={this.handleChange.bind(this)} />
        <br/>
        <input type="password" id='password' placeholder='Password' value={this.state.password} onChange={this.handleChange.bind(this)} />
        <br/><br/>
        <input type="submit" class='submitButton' value="Register"/>
      </form>
    </div>
    );
  }

}

export default CreateAccount;

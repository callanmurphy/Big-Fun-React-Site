import React, { Component } from "react";
import './CreateAccount.css';

class CreateAccount extends Component {
  constructor(props){
      super(props);
      this.state = {
          username: '',
          password: '',
          confirmPassword: '',
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
      if(this.state.password == this.state.confirmPassword){
        // alert("Account successfully created for: " + this.state.username);
        window.location.href = "/";
      }
      else{
        alert("Passwords don't match");
      }
  }

  render() {
      
    return (
      <div className="centerBox">
        <img className='loginLogo' src={'/img/icon-circle.png'} alt="Big Fun Logo"/>
        <h1 className='headingText'>Create Account</h1>
        <form name='registerForm' onSubmit={this.handleSubmit}>
          <input required id='username' placeholder='Username' type='text' value={this.state.username} onChange={this.handleChange.bind(this)} />
          <br/>
          <input required id='password' placeholder='Password' type='password' value={this.state.password} onChange={this.handleChange.bind(this)} />
          <br/>
          <input required id='confirmPassword' placeholder='Confirm password' type='password' value={this.state.confirmPassword} onChange={this.handleChange.bind(this)} />
          <br/>
          <button id='submit' type="submit" className='submitButton'>Sign up</button>
          <div>
            <p><a className='quickLink' href='/login'>Have an account?</a></p>
          </div>
        </form>
      </div>
      );
    }
  
  }

export default CreateAccount;

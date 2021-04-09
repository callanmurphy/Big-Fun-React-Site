import React, { Component } from "react";
import './Account.css';
import { createUser } from '../../backend'
import Alert from '@material-ui/lab/Alert';

class CreateAccount extends Component {
  constructor(props){
      super(props);
      this.state = {
          username: '',
          password: '',
          confirmPassword: '',
          signupError: false,
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
      const passwordConfirm = this.state.password === this.state.confirmPassword;
      // const strcheck = this.state.username.match("^[a-zA-Z0-9]{1,20}$") != null;
      if(passwordConfirm){
        // alert("Account successfully created for: " + this.state.username);
        this.setState({signupError : false});
        window.location.href = "/";
        createUser(this.state.username, this.state.password);
      }
      else{
        this.setState({signupError : true});
        // alert("Passwords don't match");
      }
  }

  render() {
      
    return (
      <div className="centerBox">
        { this.state.signupError &&
        <div>
          <Alert severity="error">Account error: passwords must match</Alert>
          <p></p>
        </div>
      }
        <img className='loginLogo' src={'/img/icon-circle.png'} alt="Big Fun Logo"/>
        <h1 className='headingText'>Create Account</h1>
        <form name='registerForm' onSubmit={this.handleSubmit}>
          <input required id='username' class='loginBox' placeholder='Username' type='text' value={this.state.username} onChange={this.handleChange.bind(this)} />
          <br/>
          <input required id='password' class='loginBox' placeholder='Password' type='password' value={this.state.password} onChange={this.handleChange.bind(this)} />
          <br/>
          <input required id='confirmPassword' class='loginBox' placeholder='Confirm password' type='password' value={this.state.confirmPassword} onChange={this.handleChange.bind(this)} />
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
import React, { Component } from "react";
import './Account.css';
// import { Button, TextField, Box, Paper } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));


class Login extends Component {
  constructor(props){
      super(props);
      this.state = {
          username: '',
          password: '',
          loginError: null,
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
    
  async handleSubmit(e){
      e.preventDefault();
      const loginSucc = await this.props.login(this.state.username, this.state.password);
      const strcheck = this.state.username.match("^[a-zA-Z0-9_]*$") != null;
      if(loginSucc && strcheck){
        // <Alert severity="success">{ this.state.username } + " logged in successfully"</Alert>
        // alert(this.state.username + " logged in successfully");
        // window.location.href = "/home";
        this.setState({loginError : null});
      } else {
        this.setState({loginError : "check username and password"});
      }
  }
  
  render() {
      
    return (
    <div className="centerBox">
      { this.state.loginError &&
        <div>
          <Alert severity="error">Login error: { this.state.loginError }</Alert>
          {/* <Alert severity="warning">This is a warning alert — check it out!</Alert>
          <Alert severity="info">This is an info alert — check it out!</Alert>
          <Alert severity="success">This is a success alert — check it out!</Alert> */}
          <p></p>
        </div>
      }
      <img className='loginLogo' src={'/img/icon-circle.png'} alt="Big Fun Logo"/>
      <h1 className='headingText'>Login to Big Fun</h1>
      <form name='registerForm' onSubmit={this.handleSubmit}>
        <input required id='username' className='loginBox' placeholder='Username' type='text' value={this.state.username} onChange={this.handleChange.bind(this)} />
        <br/>
        <input required id='password' className='loginBox' placeholder='Password' type='password' value={this.state.password} onChange={this.handleChange.bind(this)} />
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

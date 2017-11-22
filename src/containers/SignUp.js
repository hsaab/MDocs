import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Redirect from 'react-router-dom'
import Form from '../components/Form.js';
import '../style/SignUp.css';
const dbUrl = "http://localhost:3000";

class SignUp extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
    }
  }

  handleSignUp(user, pass) {
    axios.post(dbUrl + '/auth/signup', {
        username: user,
        password: pass
    })
      .then((res) => {
        console.log('Sign up successful!')
        console.log(this.context.router);
        this.context.router.history.replace('/login')
      })
}

  render() {
    return (
      <div className="background-login">
        <div className="link-wrapper-signup">
          <span className="square"><Link className={["sixth before after", "link"].join(' ')} to="/">Home</Link></span>
          <span className="square"><Link className={["sixth before after", "link"].join(' ')} to="/login">Login</Link></span>
          <span className="square"><Link className={["link-right", "sixth before after", "link"].join(' ')} to="/signup">Sign up</Link></span>
        </div>
          <Form action={(user, pass) => this.handleSignUp(user, pass)}/>
      </div>
    );
  }
}

SignUp.contextTypes = {
  router: React.PropTypes.func.isRequired
};


export default SignUp;

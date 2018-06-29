import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Form from '../components/Form.js';
import '../style/Login.css';
const dbUrl = "http://localhost:3000";

class Login extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
    }
  }

  handleLogin(user, pass) {
    axios.post(dbUrl + '/auth/login', {
      username: user,
      password: pass
      },
      {withCredentials: true}
    )
      .then((res) => {
        console.log('Login successful!')
        this.context.router.history.replace('/api/home')
      })
}

  render() {
    return (
      <div className="background-login">
        <div className="link-wrapper-login">
          <span className="square"><Link className={["sixth before after", "link"].join(' ')} to="/">Home</Link></span>
          <span className="square"><Link className={["link-middle", "sixth before after", "link"].join(' ')} to="/login">Login</Link></span>
          <span className="square"><Link className={["sixth before after", "link"].join(' ')} to="/signup">Sign up</Link></span>
        </div>
          <Form action={(user, pass) => this.handleLogin(user, pass)}/>
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.func.isRequired
};


export default Login;

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import '../style/Form.css';

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

handleSubmit(e) {
  e.preventDefault()
  this.props.action(this.state.username, this.state.password)
  this.setState({
    username: '',
    password: ''
  })
}

  render() {
    return (
      <div className="form-container">
        <div className="form">
          <TextField
            style={{width: '400px', height: '80px', fontSize: '25px', position: 'relative', bottom: '18px', borderColor: 'black'}}
            floatingLabelStyle={{color: '#353a41', fontWeight: 'bold', fontFamily: 'Fira Sans Condensed'}}
            floatingLabelFocusStyle={{color: '#d73444'}}
            underlineFocusStyle={{borderColor: '#d73444'}}
            inputStyle={{fontSize: '20px'}}
            floatingLabelFixed
            floatingLabelText="Username"
            name="username"
            type="username"
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
          /> <br/>
          <TextField
            style={{width: '400px', height: '80px', fontSize: '25px', color: 'white'}}
            inputStyle={{fontSize: '20px'}}
            floatingLabelStyle={{color: '#353a41', fontWeight: 'bold', fontFamily: 'Fira Sans Condensed'}}
            floatingLabelFocusStyle={{color: '#d73444'}}
            underlineFocusStyle={{borderColor: '#d73444'}}
            floatingLabelFixed
            floatingLabelText="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          /> <br/>
          <button className="signature" onClick={(e) => this.handleSubmit(e)}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Form;

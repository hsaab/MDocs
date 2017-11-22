import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../style/Input.css';

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }
    }

handleSubmit(e) {
  e.preventDefault()
  this.props.action(this.state.text, this.props.id)
  this.setState({
    text: '',
    id: ''
  })
}

  render() {
    return (
      <div className="input">
        <TextField
          style={{width: '275px', height: '80px', fontSize: '20px', color: 'white'}}
          floatingLabelStyle={{fontWeight: 'bold'}}
          floatingLabelFocusStyle={{color: '#d73444'}}
          underlineFocusStyle={{borderColor: '#d73444'}}
          hintText={this.props.hint}
          hintStyle={{fontSize: '13px'}}
          inputStyle={{fontSize: '15px'}}
          floatingLabelFixed
          floatingLabelText={this.props.name}
          name={this.props.name}
          type="text"
          value={this.state.text}
          onChange={(e) => this.setState({ text: e.target.value })}
        /> <br/>
        <RaisedButton
          style={{width: '30px', height: '30px', position: 'relative', top: '40px', left: '10px'}}
          labelStyle={{fontWeight: 'bold', top: '5px', color: 'grey'}}
          label="Submit"
          onClick={(e) => this.handleSubmit(e)}
        />
      </div>
    );
  }
}


export default Input;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Iframe from 'react-iframe';
import ReactPlayer from 'react-player'
import '../style/Welcome.css';

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      class: 'background-dummy'
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({
      class: 'background-welcome'}), 1500)
  }

  render() {
    return (
      <div className={this.state.class}>
        <ReactPlayer style={{position:'relative', bottom: '150'}} width='1535' height='1200'playing loop url="https://www.youtube.com/embed/ToJDRt2xwXU?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0"/>
          <div className="link-wrapper">
            <span className="square"><Link className={["sixth before after", "link"].join(' ')} to="/">Home</Link></span>
            <span className="square"><Link className={["sixth before after", "link"].join(' ')} to="/login">Login</Link></span>
            <span className="square"><Link className={["sixth before after", "link"].join(' ')} to="/signup">Sign up</Link></span>
          </div>
          <h1 className="app-title">Welcome to Magic Docs</h1>
      </div>
    );
  }
}


export default Welcome;

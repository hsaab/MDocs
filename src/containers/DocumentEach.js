import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import '../style/DocumentEach.css';
const io = require('socket.io-client')
const socket = io('localhost:3000');
const dbUrl = "http://localhost:3000";

class DocumentEach extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      user: '',
      onlineUsers: [],
      current: '',
      collaborators: [],
      owner: '',
      previous: '',
      title: '',
      id: '',
      editorState: EditorState.createEmpty()
    }
  }

  componentWillMount() {
    this.receiveChanges()
    axios.get(dbUrl + '/api/home', {
      withCredentials: true
    })
      .then((res) => {
        this.setState({
          user: res.data.message.username
        })
        console.log('Credentials authenticated!')
      })
      .catch((err) => {
        console.log('Error validating credentials', err)
        return Error
    });

    axios.get(dbUrl + '/api/home/one/' + this.props.docId, {
      withCredentials: true
    })
    .then((res) => {
      this.setState({
        collaborators: res.data.message.collaborators,
        current: res.data.message.current,
        owner: res.data.message.owner,
        previous: res.data.message.previous,
        title: res.data.message.title,
        id: res.data.message._id,
      })
      const parsed = JSON.parse(res.data.message.current).content;
      return parsed;
    })
    .then((parsed) => {
      var newEditorState = EditorState.createWithContent(convertFromRaw(parsed));
      this.setState({
        editorState: EditorState.forceSelection(newEditorState, this.state.editorState.getSelection())
      })
      this.userConnect()
    })
    .catch((err) => {
      console.log('Error rendering document from MongoDb', err)
    })
  }

  componentDidUnmount() {
    const onlineUsers = this.state.onlineUsers;
    const currentUser = this.state.user;
    const updatedUsers = onlineUsers.map((user) => {
      if(user !== currentUser) {
        return user
      }
    })
    this.setState({
      onlineUsers: updatedUsers
    })
  }

  userConnect() {
    socket.on('connect', function() {
    console.log('Connected from react!');
  });

    socket.emit('connected', this.state.user)

    socket.on('user', (user) => {
      const onlineUsers = this.state.onlineUsers.concat(user)
      this.setState({
        onlineUsers: onlineUsers
      })
    })
  }

  onChange = (editorState) => {
    this.setState({
      editorState
    });
    const content = editorState.getCurrentContent();
    const contentJson = JSON.stringify({content: convertToRaw(content)})
    socket.emit('send', contentJson)
  }

  receiveChanges() {
    socket.on('receive', (eState) => {
      const parsed = JSON.parse(eState).content;
      var newEditorState = EditorState.createWithContent(convertFromRaw(parsed));
      this.setState({
        editorState: EditorState.forceSelection(newEditorState, this.state.editorState.getSelection())
      });
    });
  }

  styleClick(style) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
  }

  handleSubmit(e) {
    e.preventDefault()
    const content = this.state.editorState.getCurrentContent()
    const contentJson = JSON.stringify({content: convertToRaw(content)});
    const id = this.state.id
    axios.post(dbUrl + '/api/home/savedoc', {
      id: id,
      current: contentJson
      },
      {withCredentials: true}
    )
      .then((res) => {
        console.log('Successfully sent update');
      })
      .catch((err) => {
        console.log('Error submitting updated doc info', err)
      })
  }

  render() {
    const collaborators = this.state.collaborators
    const onlineUsers = [this.state.onlineUsers, 'cooldaddy989']
    return (
      <div className="each-container">
        <div className="each-subcontainer">

        <div className="each-top">
          <div className="each-top-bar">
            <span className="square-main"> <Link className="link-main" to="/api/home">Back to Doc Mainpage</Link> </span>
            <span className="each-title"> {this.state.title} </span>
            <h4 className="each-header-top">Document Id: {this.state.id}</h4>
            <h4 className="each-header-bottom">Users Online: {onlineUsers.length <= 1 ? onlineUsers : onlineUsers.map((user) => (user + '  '))}</h4>
          </div>

          <div className="detail-container">
            <div className="each-desc-box">
              <span className="desc-title"> Details </span>
              <div className="each-desc">
                <h5>Owner: {this.state.owner.username}</h5>
                <h5>Collaborators: {collaborators.map((obj) => (obj.username))}</h5>
              </div>
            </div>
            <div className="each-desc-box">
              <span className="desc-title"> Previous Versions</span>
                <div className="each-desc">
                  <h5>11/1/2017 - 9:00 pm</h5>
                  <h5>11/1/2017 - 8:00 pm</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="editor-container">
            <div className="editor-buttons">
              <RaisedButton label='Bold' onClick={() => this.styleClick('BOLD')}/>
              <RaisedButton label='Underline' onClick={() => this.styleClick('UNDERLINE')}/>
              <RaisedButton label='Italics' onClick={() => this.styleClick('ITALIC')}/>
            </div>
            <div className="editor">
              <Editor editorState={this.state.editorState} onChange={this.onChange}/>
            </div>
            <div className="each-submit">
              <RaisedButton labelStyle={{color: 'white'}} style={{position: 'relative', top: '13px', width: '1279px'}} label='Save Changes' onClick={(e) => this.handleSubmit(e)}/>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

DocumentEach.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default DocumentEach;

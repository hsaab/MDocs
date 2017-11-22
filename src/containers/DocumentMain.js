import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DocList from '../components/DocList';
import Input from '../components/Input';
import axios from 'axios';
import '../style/DocumentMain.css';
const dbUrl = "http://localhost:3000";

class DocumentMain extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      userId: '',
      docs: []
    }
  }

  componentWillMount() {
    axios.get(dbUrl + '/api/home', {
      withCredentials: true
    })
      .then((res) => {
        this.setState({
          userId: res.data.message._id
        })
        console.log('Credentials authenticated!')
      })
      .catch((err) => {
        console.log('Error validating credentials', err)
        return Error
    });

    axios.get(dbUrl + '/api/home/getdocs', {
      withCredentials: true
    })
      .then((res) => {
        this.setState({
          docs: res.data.message
        })
        console.log('Found the users docs', res.data.message)
      })
      .catch((err) => {
        console.log('Error rendering the users docs', err)
    });
  }

  addNewDoc(title, id) {
    axios.post(dbUrl + '/api/home/adddoc', {
      title: title,
      owner: id
      },
      {withCredentials: true}
    )
      .then((res) => {
        const docId = res.data.message
        console.log('New doc has been added!', docId)
        return docId;
      })
      .then((id) => {
        this.context.router.history.push('/api/home/' + id);
      })
      .catch((err) => {
        console.log('Error adding new document', err)
        return Error
    });
  }

  viewDoc(id) {
    this.context.router.history.push('/api/home/' + id)
  }

  addSharedDoc(docId) {
    axios.post(dbUrl + '/api/home/addshared', {
      userId: this.state.userId,
      docId: docId
      },
      {withCredentials: true}
    )
      .then((res) => {
        const newDocList = this.state.docs;
        this.setState({
          docs: this.state.docs.concat(res.data.message)
        })
        console.log('Add you as a new collaborator on this document', res.data.message)
      })
      .then((id) => {
        this.context.router.history.push('/api/home/' + docId)
      })
      .catch((err) => {
        console.log('Error adding new document', err)
        return Error
    });
  }

  render() {
    return (
      <div className='main-container'>
        <div className='main-subcontainer'>
          <div className="link-wrapper-main">
            <span className="square-main"><Link className={["link-main"].join(' ')} to="/">Home</Link></span>
            <span className="square-main"><Link className={["link-main"].join(' ')} to="/login">Login</Link></span>
            <span className="square-main"><Link className={["link-main"].join(' ')} to="/signup">Sign up</Link></span>
          </div>
          <h2 className="main-title"> Text-Editor Home Page </h2>
          <div>
            <span className="action-sub"> Add or Share a Document </span>
            <div className="input-container">
                <Input action={(title, id) => this.addNewDoc(title, id)} id={this.state.userId} name="Add New Document" hint="Enter new document title"/>
              <div className="input-shared">
                <Input action={(id) => this.addSharedDoc(id)} id={this.state.userId} name="Add Shared Document" hint="Enter document id"/>
              </div>
            </div>
          </div>
          <div className="doc-container">
            <span className="action-sub"> List of Documents </span>
            <div className="docs">
              <DocList action={(id) => this.viewDoc(id)} docs={this.state.docs}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DocumentMain.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default DocumentMain;

import React, { Component } from 'react';
import {List, ListItem, Paper} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';

var array = [0,1,2,3,4,5,6,7,8,9,10]

class DocList extends Component {
  constructor(props) {
    super(props)
  }

  docClick(e, id) {
    e.preventDefault();
    this.props.action(id)
  }

  render() {
    const docs = this.props.docs
    return(
        <List style={{width: '99%', overflow: 'auto'}}>
          {docs.map((doc, index) => {
            return <span style={{width: '100%'}}> <ListItem primaryText={(index + 1) + ' ' + doc.title} leftIcon={<ContentSend/>} onClick={(e) => this.docClick(e, doc._id)} />
            <Divider style={{width: '100%'}}/> </span>
          })}
        </List>
    )
  }
}

export default DocList;

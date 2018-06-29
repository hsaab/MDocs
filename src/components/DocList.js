import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
import Divider from 'material-ui/Divider';

class DocList extends Component {

  docClick(e, id) {
    e.preventDefault();
    this.props.action(id)
  }

  render() {
    const docs = this.props.docs;
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

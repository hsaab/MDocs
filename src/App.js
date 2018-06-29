import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Welcome from './containers/Welcome';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import DocumentMain from './containers/DocumentMain.js';
import DocumentEach from './containers/DocumentEach.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
          <div>
            <Switch>
              <Route path="/" exact component={Welcome}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/signup" exact component={SignUp}/>
              <Route path="/api/home" exact component={DocumentMain}/>
              <Route path="/api/home/:docId" render={({match}) => (<DocumentEach docId={match.params.docId}/>)}/>
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </div>
      </BrowserRouter>
    );
  }
};

export default App;

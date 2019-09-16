import React from 'react';
import Editor from './screens/editor';
import Home from './screens/home';
import Admin from './screens/admin';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/editor/:roomid" component={Editor} />
          <Route path="/admin" exact component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;

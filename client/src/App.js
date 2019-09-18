import React from 'react';
import Compete from './screens/compete';
import Home from './screens/home';
import Admin from './screens/admin';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/compete/:roomid" component={Compete} />
          <Route path="/admin" exact component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;

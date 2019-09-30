import React from 'react';
import Compete from './screens/compete';
import Home from './screens/home';
import Admin from './screens/admin';
import AdminQuestions from './screens/adminQuestions';
import AdminAdd from './screens/adminAdd';
import Login from './screens/Login';
import Logout from './components/Logout';
import PrivateRoute from './helper/PrivateRoute';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/compete/:roomid" component={Compete} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <PrivateRoute path="/admin" exact component={Admin} />
          <PrivateRoute path="/admin/questions" exact component={AdminQuestions} />
          <PrivateRoute path="/admin/questions/add" exact component={AdminAdd} />
      </Switch>
    </Router>
  );
}

export default App;

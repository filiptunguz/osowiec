import React, {Component} from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Cookies from "universal-cookie/lib";

// Components
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import axios from "axios";
import MyProfile from "./Components/MyProfile/MyProfile";
import Employers from "./Components/Employers/Employers";
import Profile from "./Components/Profile/Profile";
import {withRouter} from "react-router";
import RedirectIndex from "./Components/Home/SelectionModal/RedirectIndex/RedirectIndex";
import RedirectHome from "./Containers/RedirectHome";

const cookies = new Cookies();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  componentDidMount() {
    // Check userLogged status
    if (cookies.get('userApiKey')) {
      const userApiKey = cookies.get('userApiKey');

      axios.get('https://osowiec.000webhostapp.com/userApiKeyLogin.php?userApiKey=' + userApiKey)
        .then(res => {
          this.setState({user: res.data});
        })
    }
  }

  handleUserLogin(loggedUser) {
    this.setState({user: loggedUser})
  }

  logoutUser() {
    cookies.remove('userApiKey');
    this.props.history.push('/');
    this.setState({user: {}});
  }

  render() {
    return (
      <div className="App">
        <NavBar user={this.state.user} />
        <Switch>
          <Route exact path="/">
            <Home user={this.state.user} />
          </Route>
          <Route path="/login">
            <Login onUserLogin={this.handleUserLogin} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/moj-profil">
            <MyProfile user={this.state.user} logoutUser={this.logoutUser} />
          </Route>
          <Route path="/zaposlena-lica">
            <Employers />
          </Route>
          <Route path="/:id/profil">
            <Profile />
          </Route>
          <Route path="/index">
            <RedirectHome />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
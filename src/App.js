import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <NavBar/>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

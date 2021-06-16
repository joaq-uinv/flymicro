import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Flights from "./components/Flights/Flights";
import Selected from "./components/Selected/Selected";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route path="/flights" component={() => <Flights />} />
          <Route path="/purchase" component={() => <Selected />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

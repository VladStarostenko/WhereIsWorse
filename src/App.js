import React from "react";
import "./App.css";
import Navbar from "./components/navBar";
import MainPageContainer from "./components/mainPage/mainPageContainer";
import WeekPageContainer from "./components/weekPage/weekPageContainer";
import { Route } from "react-router-dom";

function App(props) {
  return (
    <div className="App">
      <Navbar />
      <div>TEST</div>
      <div>
        <Route
          exact
          path="/"
          component={MainPageContainer}
        />
        <Route
          exact
          path="/week"
          component={WeekPageContainer}
        />
      </div>
    </div>
  );
}

export default App;

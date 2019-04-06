import * as React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Home from "../components/home";
import Auth from "../components/auth";
import LogIn from "../components/log-in";
import Main from "../components/main";

class App extends React.Component {
  render() {
    return (
      <Router basename={process.env.BASE_NAME}>
        <Route path="/" exact component={Home} />
        <Route path="/auth/" component={Auth} />
        <Route path="/log-in/" component={LogIn} />
        <Route path="/main/" component={Main} />
        <Route path="*" component={LogIn} />
      </Router>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    counter: state
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./templates/NotFound";
import Article from "./templates/Article";
import Archive from "./templates/Archive";
import Tags from "./templates/Tags";
import "./App.css";

class App extends Component {
  render() {
    let links = [
      { label: "Home", link: "/wordpress/", active: true },
      { label: "About", link: "/wordpress/about/" },
      { label: "Contact Us", link: "/wordpress/contact-us/" }
    ];
    return (
      <Router>
        <Header links={links} />
        <Switch>
          <Route exact path="/wordpress/" component={Home} />
          <Route exact path="/wordpress/about/" component={About} />
          <Route path={`/wordpress/article/:slug`} component={Article} />
          <Route path={`/wordpress/category/:slug`} component={Archive} />
          <Route path={`/wordpress/tag/:id`} component={Tags} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;

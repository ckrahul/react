import React, { Component } from "react";
import searchIcon from "../media/search-icon.png";
import "../menu.css";
import { Link } from "react-router-dom";

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      showForm: false
    };
  }

  showForm() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  render() {
    let searchForm = this.state.showForm ? (
      <form className="menu__search-form" method="POST">
        <input
          className="menu__search-input"
          placeholder="Type and hit enter"
        />
      </form>
    ) : (
      ""
    );

    let linksMarkup = this.props.links.map((link, index) => {
      let linkMarkup = link.active ? (
        <Link to={link.link} className="menu__link menu__link--active">
          {link.label}
        </Link>
      ) : (
        <Link to={link.link} className="menu__link">
          {link.label}
        </Link>
      );

      return (
        <li key={index} className="menu__list-item">
          {linkMarkup}
        </li>
      );
    });

    return (
      <nav className="menu">
        <h1 className="menu__logo">
          <Link to="/wordpress/">ReactDEMO</Link>
        </h1>

        <div className="menu__right">
          <ul className="menu__list">{linksMarkup}</ul>

          <button
            onClick={this.showForm.bind(this)}
            style={{
              backgroundImage: "url(" + searchIcon + ")"
            }}
            className="menu__search-button"
          />

          {searchForm}
        </div>
      </nav>
    );
  }
}

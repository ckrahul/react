import React, { Component } from "react";
import wpAPI from "../data/Api";

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: []
    };
  }

  componentDidMount() {
    function fetchData(url) {
      return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.log("error", error));
    }

    fetchData(wpAPI.pages).then(data => {
      this.setState({ about: [...this.state.about, ...data] });
    });

    function checkStatus(response) {
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }
  }

  render() {
    const { about } = this.state;
    return (
      <div className="page-wrapper">
        <div className="container">
          {about.map(page => (
            <article id={page.id}>
              <header className="entry-header">
                <h2 className="entry-title">{page.title.rendered}</h2>
              </header>
              <div className="entry-content">
                <div
                  dangerouslySetInnerHTML={{ __html: page.content.rendered }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }
}

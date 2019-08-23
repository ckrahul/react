import React, { Component } from "react";
import axios from "axios";
import wpAPI from "../data/Api";
import Sidebar from "../components/Sidebar";
import queryString from "query-string";

export default class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: [],
      id: "",
      fetch: false
    };
  }

  componentDidMount() {
    this.setState({ id: this.props.match.params.id, fetch: true });
  }

  componentDidUpdate() {
    if (this.state.id !== this.props.match.params.id) {
      this.setState({ id: this.props.match.params.id, fetch: true });
    }

    if (true === this.state.fetch) {
      axios
        .get(wpAPI.posts + "?categories=" + this.state.id)
        .then(response => response.data)
        .then(data => {
          console.log(data);
          this.setState({ terms: data, fetch: false });
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    const { terms } = this.state;
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              {terms.map(post => (
                <article id={post.id} key={post.slug}>
                  <header className="entry-header">
                    <h2 className="entry-title">{post.title.rendered}</h2>
                  </header>
                  <div className="entry-content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.content.rendered
                      }}
                    />
                  </div>
                </article>
              ))}
            </div>
            <div className="col-sm-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

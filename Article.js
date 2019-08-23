import React, { Component } from "react";
import axios from "axios";
import wpAPI from "../data/Api";
import Sidebar from "../components/Sidebar";

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    axios
      .get(wpAPI.posts + "?slug=" + this.props.match.params.slug)
      .then(response => response.data)
      .then(data => {
        this.setState({ articles: data });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { articles } = this.state;
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              {articles.map(post => (
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

import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Route, Link } from "react-router-dom";
import wpAPI from "../data/Api";
import Sidebar from "../components/Sidebar";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get(wpAPI.posts)
      .then(response => response.data)
      .then(data => {
        this.setState({ posts: data });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { posts } = this.state;
    let articles = posts.map((article, index) => {
      return (
        <article className="post-article" id={article.id} key={article.id}>
          <header className="entry-header">
            <h2 className="entry-title">
              <Link to={"/wordpress/article/" + article.slug}>
                {article.title.rendered}
              </Link>
            </h2>
          </header>
          <div className="entry-content">
            {article._custom_data.featured_image && (
              <figure style={{ width: 435 }} className="wp-caption alignnone">
                <img
                  className="wp-image-59"
                  alt="Boat"
                  src={article._custom_data.featured_image[0]}
                  width={article._custom_data.featured_image[1]}
                  height={article._custom_data.featured_image[2]}
                />
              </figure>
            )}
            <span className="byline">
              <svg
                className="svg-icon"
                width="16"
                height="16"
                aria-hidden="true"
                role="img"
                focusable="false"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
              <span className="screen-reader-text">Posted by</span>&nbsp;
              <span className="author">{article._custom_data.author.name}</span>
              &nbsp;
              <span className="screen-reader-text">Posted in</span>&nbsp;
              <span className="post-date">{article._custom_data.date}</span>
            </span>
            <div
              dangerouslySetInnerHTML={{
                __html: article.excerpt.rendered
              }}
            />
            <Link to={"/wordpress/article/" + article.slug}>Read More...</Link>
          </div>
        </article>
      );
    });

    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">{articles}</div>
            <div className="col-sm-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

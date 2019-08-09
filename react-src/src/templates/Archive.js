import React, { Component } from "react";
import axios from "axios";
import wpAPI from "../data/Api";
import Sidebar from "../components/Sidebar";

export default class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: []
    };
  }

  async componentDidMount() {
    const response = await axios.get(
      wpAPI.posts +
        "?filter[taxonomy]=category&filter[term]=" +
        this.props.match.params.slug
    );
    try {
      this.setState({
        terms: response.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({ error, isLoading: false });
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

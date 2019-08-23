import React, { Component } from "react";
import axios from "axios";
import wpAPI from "../data/Api";
import Sidebar from "../components/Sidebar";

export default class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      id: '',
      fetch: false
    };
  }

  componentDidMount() {
      this.setState({ id : this.props.match.params.id, fetch: true });
  }

  componentDidUpdate(){
    if( this.state.id !== this.props.match.params.id ) {
      this.setState({id : this.props.match.params.id, fetch: true });
    }

    if( true === this.state.fetch ) {
    axios
      .get(wpAPI.posts + "?tags[]=" + this.state.id)
      .then(response => response.data)
      .then(data => {
        console.log( data );
        this.setState({ tags: data, fetch : false });
      })
      .catch(error => console.log(error));
    }
  }

  render() {
    const { tags } = this.state;

    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              {tags.map(tag => (
                <article key={tag.slug}>
                  <header className="entry-header">
                    <h2 className="entry-title">{tag.title.rendered}</h2>
                  </header>
                  <div className="entry-content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: tag.content.rendered
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

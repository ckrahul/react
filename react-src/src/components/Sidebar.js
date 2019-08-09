import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Route, Link } from "react-router-dom";
import wpAPI from "../data/Api";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      tags: []
    };
  }

  componentDidMount() {
    axios
      .all([
        axios.get(wpAPI.categories).then(response => response.data),
        axios.get(wpAPI.tags).then(response => response.data)
      ])
      .then(
        axios.spread((cat, tag) => {
          this.setState({ categories: cat });
          this.setState({ tags: tag });
        })
      )
      .catch(error => console.log(error));
  }

  render() {
    const { categories, tags } = this.state;

    return (
      <div className="sidebar-wrap">
        <h2>Archive</h2>
        <ul className="cat-lists">
          {categories.map(cat => (
            <li className="cat-list" key={cat.slug}>
              <Link to={"/wordpress/category/" + cat.slug}>{cat.name}</Link>
            </li>
          ))}
        </ul>
        <h2>Tags</h2>
        <ul className="tag-lists">
          {tags.map(tag => (
            <li className="tag-list" key={tag.name}>
              <Link to={"/wordpress/tag/" + tag.id}>{tag.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

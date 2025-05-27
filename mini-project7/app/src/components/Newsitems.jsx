import React, { Component } from 'react';

export default class Newsitems extends Component {
  render() {
    let { title, description, url, linkurl, author, date, source } = this.props;

    return (
      <div className="container mt-4">
        <div className="card position-relative">
          <img
            src={url ? url : "https://via.placeholder.com/400x200?text=No+Image"}
            alt="news"
            className="card-img-top"
          />
          <div className="card-body">
            <span className="badge rounded-pill bg-danger text-light position-absolute top-0 end-0 m-2">
              {source}
            </span>
            <h5 className="card-title text-success">
              {title ? title.slice(0, 50) + "..." : "No Title"}
            </h5>
            <p className="card-text">
              {description ? description.slice(0, 200) + "..." : "No description"}
            </p>
            <p>By: {author ? author : "Anonymous"}</p>
            <hr />
            <p>Published At: {new Date(date).toLocaleString()}</p>
            <a
              href={linkurl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-danger"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

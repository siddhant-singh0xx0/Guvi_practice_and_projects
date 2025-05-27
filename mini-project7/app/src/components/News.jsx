import React, { Component } from "react";
import Newsitems from "./Newsitems";
import PropTypes from 'prop-types';
import Spinner from "./Spinner";

export default class News extends Component {
  
  // Default props
  static defaultProps = {
    apiKey: "34444f5ad6954f93a2a2735cb85c21c8",
    country: "us",
    pageSize: 9,
    category: "technology"
  };

  // Prop types
  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    console.log("I am a constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
  }

  // Fetch data after component mounts
  async componentDidMount() {
    this.setState({ loading: true });
    const { country, category, pageSize, apiKey } = this.props;
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=34444f5ad6954f93a2a2735cb85c21c8`;
    
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  // Next Page
  handleNext = async () => {
    const { country, category, pageSize, apiKey } = this.props;
    const nextPage = this.state.page + 1;
    
    this.setState({ loading: true });

    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=34444f5ad6954f93a2a2735cb85c21c8`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: nextPage,
      articles: parsedData.articles,
      loading: false
    });
  };

  // Previous Page
  handlePrev = async () => {
    const { country, category, pageSize, apiKey } = this.props;
    const prevPage = this.state.page - 1;

    if (prevPage < 1) return;

    this.setState({ loading: true });

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: prevPage,
      articles: parsedData.articles,
      loading: false
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center text-danger">Live News</h1>

        {this.state.loading && <Spinner />}

        <div className="container">
          <div className="row">
            {this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <Newsitems
                  title={element.title}
                  description={element.description}
                  url={element.urlToImage}
                  linkUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
          
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-danger me-md-2"
              onClick={this.handlePrev}
              disabled={this.state.page <= 1}
            >
              &laquo; Prev
            </button>
            <button
              className="btn btn-danger"
              onClick={this.handleNext}
            >
              Next &raquo;
            </button>
          </div>

          <br />
        </div>
      </>
    );
  }
}

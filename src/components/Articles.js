import React from 'react';

const API_URL = 'https://jsonmock.hackerrank.com/api/articles?page=';

class Articles extends React.Component {
  constructor() {
    super()
    this.state = {
      pageButtons: 1,
      articles: []
    };
  }

  componentDidMount = () => {
    this.getPageArticles();
  }

  getPageArticles = (pageNum = 1) => {
    fetch(`${API_URL}${pageNum}`)
      .then(res => {
        if (!res.ok) {
          console.error('Invalid response');
          return Promise.reject(res.statusText);
        }
        return res.json();
      }).then(data => {
        this.setState({
          pageButtons: data.total_pages,
          articles: data.data
        });
      }).catch(e => {
        console.error('Error in fetching api data', e);
      })
  }

  renderButtons = () => {
    const { pageButtons } = this.state;
    const arr = [];
    for (let i = 0; i < pageButtons; i++) {
      const pageNum = i + 1;
      arr.push(<button data-testid="page-button"
        key={`page-button-${i}`}
        onClick={e => this.getPageArticles(pageNum)}>{pageNum}</button>);
    }
    return arr;
  }

  renderArticleTitles = () => {
    const { articles } = this.state;
    const filteredArticles = articles.filter(article => article.title);
    return filteredArticles.map(article => {
      return <li key={`title-${article.title}`}
        data-testid="result-row">{article.title}</li>
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="pagination">
          {this.renderButtons()}
        </div>
        <ul className="results">
          {this.renderArticleTitles()}
        </ul>
      </React.Fragment>
    );
  }
}

export default Articles;

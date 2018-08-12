import React, { Component } from 'react';
import './App.css';
import posts from './data.js';

function Image(props) {
  return (
    <img className="img-fluid rounded p-3" src={props.imgSrc} alt={props.imgAlt}/>
  );
}

function Author(props) {
  return (
    <span>{props.author}</span>
  );
}

function Title(props) {
  return (
    <header className="font-weight-bold">
      <span>{props.title}</span>
    </header>
  );
}

function Comment(props) {
  return (
    <div className="col-12">
    <p>{props.comment}</p>
    </div>
  );
}

function Preview(props) {
  return (
  <p> 
    {props.previewText}
  </p>
  );
}

function Utilities(props) {
  return (
    <div className="row">
      <div className="col-8 d-flex align-items-end">
        <form>
          <div className="form-group">
            <label htmlFor="filter"></label>
            <input type="text" name="filter" className="form-control form-control-sm" placeholder="Filter" />
          </div>
        </form>
        <div className="form-group dropdown pl-3">
          <a className="dropdown-toggle" href="/" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sort By Title
          </a>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a className="dropdown-item" href="/">Author</a>
            <a className="dropdown-item" href="/">Popularity</a>
            <a className="dropdown-item" href="/">Post Date</a>
          </div>
        </div>
      </div>
      <div className="col-4 d-flex align-items-center justify-content-end">
        <button type="button" className="m-0 btn btn-primary btn-sm">New Post</button>
      </div>
    </div>
  );
}

class Post extends React.Component {
  renderPost(post, index) {
    return (
      <div className="row mt-1 bg-light border rounded" key={index}>
        <div className="col-xs-12 col-sm-4 col-lg-3">
          <Image imgSrc={post.imgSrc}/>
        </div>
        <div className="col-xs-12 col-sm-6 col-lg-7 p-3">
          <Title title={post.title}/>
          <Preview previewText={post.previewText}/>
          <span> 1 Day ago | 0 comments </span>
          <Comment comment=">>> this is a comment!" />
        </div>
        <div className="col-xs-12 col-sm-2 p-3 text-right">
          <Author author={post.author}/>
        </div>
      </div>
    );
  }
  render() {
    const postList = posts.map((post, index) => {
      return this.renderPost(post, index);
    });
    return (
      <div>
        {postList}
      </div>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light border-bottom">
          <span className="navbar-brand mb-0 h1">Trollem</span>
        </nav>
        <div className="container-fluid">
          <div className="row pb-5 pt-2 d-flex justify-content-center">
            <div className="col-11">
              <Utilities />
              <Post posts={posts}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

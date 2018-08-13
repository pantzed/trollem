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

function Body(props) {
  return (
  <p> 
    {props.body}
  </p>
  );
}

function CreatePost() {
  return (
      <form>
        <div className="form-group">
          <label htmlFor="title" className="font-weight-bold">Title</label>
          <input type="text" name="title" className="form-control form-control-sm" required/>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="font-weight-bold">Body</label>
          <input type="text" name="body" className="form-control form-control-sm" required/>
        </div>
        <div className="form-group">
          <label htmlFor="author" className="font-weight-bold">Author</label>
          <input type="text" name="author" className="form-control form-control-sm" required/>
        </div>
        <div className="form-group">
          <label htmlFor="imgUrl" className="font-weight-bold">Img URL</label>
          <input type="text" name="imgUrl" className="form-control form-control-sm" required/>
        </div>
        <button type="submit" className="btn btn-primary btn-sm" disabled="true">Create Post</button>
      </form>
  );
}

class Utilities extends React.Component {
  constructor() {
    super()
    this.state ={
      isHidden: true,
    }
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }
  
  render() {
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
          <button type="button" className="m-0 btn btn-primary btn-sm" onClick={this.toggleHidden.bind(this)}>New Post</button>
        </div>
        <div className="row">
          <div className="col-12">
            {!this.state.isHidden && <CreatePost />}
          </div>
        </div>
      </div>
    );
  }
}

function Comments(props) {
  console.log(props);
  return (
    <div>
      <ul>
        <CommentList comments={props.comments}/>
      </ul>
      <form>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="comment here!" />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">Add Comment</button>
      </form>
    </div>
  );
}

function CommentList(props) {
  return (
    props.comments.map(comment => <li>{comment}</li>)
  );
}

function PostList(props){
  return (
    props.posts.map((post, index) => <Post post={post} key={index}/>)
  );
}

class Post extends React.Component {

  constructor() {
    super()
    this.state = {
      isHidden: true,
    };
    this.date = Date.now();
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  calculateDate(postDate) {
    let daysSincePost = Math.floor((Date.now() - postDate) * Number.parseFloat(1.15741e-8));
    return daysSincePost;
  }

  pluralize(word, n) {
    let singluar = ` ${word}`;
    let pluralized = ` ${word}s`;
    if (n === 1) {
      return singluar
    }
    return pluralized;
  }

  render() {
    return (
      <div className="row mt-2 bg-light border rounded" key={this.props.key}>
        <div className="col-xs-12 col-sm-4 col-lg-3">
          <Image imgSrc={this.props.post.imgSrc}/>
        </div>
        <div className="col-xs-12 col-sm-6 col-lg-7 p-3">
          <Title title={this.props.post.title}/>
          <Body body={this.props.post.body}/>
          <span> {this.calculateDate(this.date)} {this.pluralize('day', this.calculateDate(this.date))} | {this.props.post.comments.length} 
            <span className="comment-cursor text-primary" onClick={this.toggleHidden.bind(this)}>
              {this.pluralize('comment',this.props.post.comments.length)}
            </span>
          </span>
          {this.state.isHidden ? null : <Comments comments={this.props.post.comments}/>}
        </div>
        <div className="col-xs-12 col-sm-2 p-3 text-right">
          <Author author={this.props.post.author}/>
        </div>
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
              <PostList posts={posts}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

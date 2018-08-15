import React, { Component } from 'react';
import './App.css';
import posts from './data.js';
import { library }  from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(far, fas)

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
    <header className="font-weight-bold d-inline-block">
      <span>{props.title} |</span>
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
    <div>
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
        <label htmlFor="imgSrc" className="font-weight-bold">Img URL</label>
        <input type="url" name="imgUrl" className="form-control form-control-sm" required/>
      </div>
    </div>
  );
}

class Utilities extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHidden: true,
      submitButton: false,
      sortBy: `Popularity`,
    }
  }

  handleChange(e) {
    let formValidity = true;
    let inputState = Array.from(e.currentTarget.querySelectorAll('input'));
    let inputValidity = inputState.map(input => {
      return input.validity.valid;
    });
    inputValidity.forEach(bool => {
      if (bool === false) {
        formValidity = false;
      }
    });
    if (formValidity === true) {
      this.setState({submitButton: true});
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
              <span>Sort By {this.props.orderBy}</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <span className="dropdown-item" propname="author" onClick={(e => this.props.sortPosts(e))}>Author</span>
              <span className="dropdown-item" propname="votes" onClick={(e => this.props.sortPosts(e))}>Popularity</span>
              <span className="dropdown-item" propname="date" onClick={(e => this.props.sortPosts(e))}>Date</span>
              <span className="dropdown-item" propname="title" onClick={(e => this.props.sortPosts(e))}>Title</span>
            </div>
          </div>
        </div>
        <div className="col-4 d-flex align-items-center justify-content-end">
          <button type="button" className="m-0 btn btn-primary btn-sm" onClick={this.toggleHidden.bind(this)}>New Post</button>
        </div>
        <div className="row">
          <div className="col-12">
            {!this.state.isHidden && 
            <form onSubmit={(e => this.props.addPost(e))} onChange={(e => this.handleChange(e))}>
              <CreatePost handleChange={this.handleChange}/>
              <button type="submit" className="btn btn-primary btn-sm" disabled={!this.state.submitButton}>Create Post</button>
            </form>}
          </div>
        </div>
      </div>
    );
  }
}

function CommentForm() {
  return (
    <div>
      <div className="form-group">
        <input id="comment" type="text" className="form-control" placeholder="comment here!" />
      </div>
      <button type="submit" className="btn btn-primary btn-sm">Add Comment</button>
    </div>
  );
}

function CommentList(props) {
  return (
    props.comments.map((comment, index) => <li key={index}>{comment}</li>)
  );
}

class Comments extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
    isHidden: true,
  };
 }

//  addComment(e) {
//    e.preventDefault();
//    this.setState({comments: this.state.comments.concat([e.target.querySelector("#comment").value])});
//  
//  }

 render() {
  return (
    <div>
      <ul>
        <CommentList comments={this.props.comments}/>
      </ul>
      <form onSubmit={(e => {this.props.handleComments(e)})}>
        <CommentForm />
      </form>
    </div>
  );
 }
}

class Post extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isHidden: true,
      votes: 0,
      posts: props.post,
      comments: props.post.comments,
      commentCount: props.post.comments.length,
    };
    this.date = Date.now();
    this.key = Date.now();
    this.handleComments = this.handleComments.bind(this);
  }

  handleComments(event) {
    event.preventDefault();
    this.setState({comments: this.state.comments.concat(event.target.querySelector('input').value)});
    const count = this.state.comments.length + 1;
    this.setState({commentCount: count});
    event.target.querySelector("#comment").value = '';
  }

  upVote() {
    let update = this.state.votes + 1;
    this.setState({votes: update});
  }

  downVote() {
    if (this.state.votes > 0){
      let update = this.state.votes - 1;
      this.setState({votes: update});
    }
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  calculateDate(postDate) {
    let daysSincePost = Math.floor((Date.now() - postDate) / 2.592e+8);
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
      <div className="row mt-2 bg-light border rounded">
        <div className="col-xs-12 col-sm-4 col-lg-3">
          <Image imgSrc={this.props.post.imgSrc}/>
        </div>
        <div className="col-xs-12 col-sm-6 col-lg-7 p-3">
          <span><Title title={this.props.post.title} votes={this.state.votes}/>
            <FontAwesomeIcon icon={fas.faFire} className="ml-2 text-success comment-cursor unselectable" onClick={this.upVote.bind(this)}/> 
            <FontAwesomeIcon icon={fas.faPoo} className="ml-2 text-danger comment-cursor unselectable" onClick={this.downVote.bind(this)}/> 
            <span className="ml-2 unselectable">{this.state.votes}</span>
          </span>
          <Body body={this.props.post.body}/>
          <span> {this.calculateDate(this.date)} {this.pluralize('day', this.calculateDate(this.date))} | {this.state.commentCount} 
            <span className="comment-cursor text-primary" onClick={this.toggleHidden.bind(this)}>
              {this.pluralize('comment', this.props.post.comments.length)}
            </span>
          </span>
          {this.state.isHidden ? null : <Comments comments={this.state.comments} handleComments={this.handleComments}/>}
        </div>
        <div className="col-xs-12 col-sm-2 p-3 text-right">
          <Author author={this.props.post.author}/>
        </div>
      </div>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
     posts: posts,
     postOrderBy: `Title`,
   };
   this.addPost = this.addPost.bind(this);
   this.sortPosts = this.sortPosts.bind(this);
  }

  sortPosts(e, property = 'title') {
    property = e.target.getAttribute('propname');
    const sortArr = [];
    const newPostOrder = [];
    this.setState({postOrderBy: e.target.innerText});
    this.state.posts.forEach((el, index) => {
      let tempArr = [el[property], index];
      sortArr.push(tempArr);
    });
    sortArr.sort();
    sortArr.forEach((el, index) => {
      newPostOrder.push(this.state.posts[el[1]]);
    });
    this.setState({posts: newPostOrder});
  }

  addPost(e) {
    e.preventDefault();
    let postObj = {};
    const inputArr = Array.from(e.target.querySelectorAll('input'));
    inputArr.forEach((el) => {
      postObj[el.name] = el.value;
    });
    postObj['imgAlt'] = 'img alt';
    postObj['comments'] = [];
    this.setState({posts: this.state.posts.concat(postObj)});
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light border-bottom">
          <span className="navbar-brand mb-0 h1">Trollem</span>
        </nav>
        <div className="container-fluid">
          <div className="row pb-5 pt-2 d-flex justify-content-center">
            <div className="col-11">
              <Utilities addPost={this.addPost} sortPosts={this.sortPosts} orderBy={this.state.postOrderBy}/>
              {this.state.posts.map((post, index) => <Post post={post} key={index}/>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

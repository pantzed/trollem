import React, { Component } from 'react';
import stars from './stars.jpg';
import './App.css';

const previewText = `
  Bacon ipsum dolor amet cow tongue prosciutto meatloaf, 
  boudin meatball biltong tail andouille leberkas cupim 
  bresaola spare ribs hamburger short loin.
`;
const title = `Star Gazing`;
const author = `Troller #1`;
const imgSrc = stars;
const imgAlt = `Moab arch and night sky`;

function Image(props) {
  return (
    <img className="img-fluid rounded p-3" src={props.imgSrc} alt={props.imgAlt} />
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

function Post(props) {
  return (
    <div className="row mt-5 bg-light border rounded">
      <div className="col-xs-12 col-sm-4 col-lg-3">
        <Image imgSrc={imgSrc} imgAlt={imgAlt} />
      </div>
      <div className="col-xs-12 col-sm-6 col-lg-7 p-3">
        <Title title={title} />
        <Preview previewText={previewText} />
        <span> 1 Day ago | 0 comments </span>
        <Comment comment=">>> this is a comment!" />
      </div>
      <div className="col-xs-12 col-sm-2 p-3 text-right">
        <Author author={author} />
      </div>
    </div>
  );
}
class App extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light border-bottom">
          <span className="navbar-brand mb-0 h1">Trollem</span>
        </nav>
        <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            <div className="col-11">
              <Post />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*
<! -- Filter form -->

<div className="row mt-5">
  <div className="col-12 d-flex align-items-center justify-content-between">
    <form>
      <div className="form-group">
        <label htmlFor="filter"></label>
        <input type="text" name="filter" className="form-control form-control-sm" placeholder="Filter" />
      </div>
      <div className="form-group dropdown">
      <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Dropdown link
      </a>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a className="dropdown-item" href="#">Action</a>
        <a className="dropdown-item" href="#">Another action</a>
        <a className="dropdown-item" href="#">Something else here</a>
      </div>
    </div>
    </form>
    <button type="button" className="m-0 btn btn-primary btn-sm">New Post</button>
  </div>
</div>
*/

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './router-folder/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheet.css';

//create index page
//renders our main react component onto our 'root' element
ReactDOM.render(<App />, document.getElementById('root'));
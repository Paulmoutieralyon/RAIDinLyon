import React from 'react';
import ReactDOM from 'react-dom';
import allReducers from './Reducers/allReducers.jsx';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import App from './App';
import store from './Store/store'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

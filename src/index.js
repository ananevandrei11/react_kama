import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import state from './Redux/State.js';
import { subscribe, addMessage, addPost, updateNewMessageText, updateNewPostText } from './Redux/State.js';

let rerenderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <Router >
                <App
                    state={state}
                    addPost={addPost}
                    updatePost={updateNewPostText}
                    addMessage={addMessage}
                    updateMessage={updateNewMessageText}
                />
            </Router>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

rerenderEntireTree(state);
subscribe(rerenderEntireTree);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

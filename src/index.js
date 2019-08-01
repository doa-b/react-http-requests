import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = "AUTH TOKEN";
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(
    requestConfig => {
        console.log(requestConfig);
        // edit request config
        return requestConfig; // if you do not do this, request execution will be blocked
    },
    error => {
        console.log(error);
        return Promise.reject(error) // Forwards it to your request if you want to also locally handle the error
    }
);

axios.interceptors.response.use(response => {
        console.log(response);
        return response;
    }, error => {
        console.log(error);
        return Promise.reject(error)
    }
);

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();

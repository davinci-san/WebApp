

// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import AppInstance from './components/app/appinstance';
import { store } from './store';

// Main render
let root = document.getElementById ('root');
ReactDOM.render (<AppInstance store={store} />, root);
// import React from 'react';
// import ReactDOM from 'react-dom/client'; // Correct import for React 18
// import App from './App';

// // Import Bootstrap CSS
// import 'bootstrap/dist/css/bootstrap.min.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import { BrowserRouter as Router } from 'react-router-dom'; // Router imported here to wrap your app
import App from './App';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>  {/* Wrap the App component with BrowserRouter */}
    <App />
  </Router>
);


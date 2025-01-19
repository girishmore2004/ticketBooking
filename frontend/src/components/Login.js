// import React, { useState } from 'react';
// import backgroundImage from '../images/background.jpg';

// const Login = ({ setIsAdminAuthenticated }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   // Hardcoded admin credentials for demo
//   const adminEmail = "admin@example.com";
//   const adminPassword = "admin123";

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (email === adminEmail && password === adminPassword) {
//       setIsAdminAuthenticated(true); // Set admin authentication state
//       setMessage('Login successful!');
//     } else {
//       setMessage('Invalid credentials. Please try again.');
//     }
//   };

//   return (
//         <div
//           style={{
//             backgroundImage: `url(${backgroundImage})`, // Apply background image
//             backgroundSize: "cover", // Ensure the background covers the entire page
//             backgroundPosition: "center", // Center the image
//             height: "100vh", // Full viewport height
//             color: "white",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {/* Form Container */}
//           <div
//             className="bg-dark p-5 rounded"
//             style={{
//               width: "100%",
//               maxWidth: "400px",
//               opacity: "0.9", // Slight transparency for the background
//             }}
//           >
//             <h2 className="text-center mb-4">Admin Login</h2>
//             {message && <p className="text-center" style={{ color: 'green' }}>{message}</p>}
//             {/* Login Form */}
//             <form onSubmit={handleLogin}>
//               <div className="form-group mb-3">
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="form-group mb-3">
//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary btn-block w-100">
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import backgroundImage from '../images/background.jpg'; 

const Login = ({ setIsAdminAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Hardcoded admin credentials for demo
  const adminEmail ="admin@example.com";
  const adminPassword ="admin123";

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === adminEmail && password === adminPassword) {
      setIsAdminAuthenticated(true); // Set admin authentication state
      setMessage('Login successful!');

      // Navigate to the Admin Dashboard after successful login
      navigate('/dashboard'); // Navigate to Admin Dashboard
    } else {
      setMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Apply background image
        backgroundSize: "cover", // Ensure the background covers the entire page
        backgroundPosition: "center", // Center the image
        height: "100vh", // Full viewport height
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Form Container */}
      <div
        className="bg-dark p-5 rounded"
        style={{
          width: "100%",
          maxWidth: "400px",
          opacity: "0.9", // Slight transparency for the background
        }}
      >
        <h2 className="text-center mb-4">Admin Login</h2>
        {message && <p className="text-center" style={{ color: 'green' }}>{message}</p>}
        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

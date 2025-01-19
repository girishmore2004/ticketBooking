// // import React, { useState } from 'react';
// // import { BrowserRouter as Router} from 'react-router-dom';
// // import UserForm from './components/UserForm';
// // import AdminDashboard from './components/AdminDashboard';
// // import Login from './components/Login';

// // const App = () => {
// //   const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
// //   const [showUserForm, setShowUserForm] = useState(false);  // State to show UserForm
// //   const [showLogin, setShowLogin] = useState(false);        // State to show Login form

// //   return (
// //     <Router>
// //       <div>
// //         <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
// //         <a className="navbar-brand" href="/">Event Ticketing Platform</a>
// //           <div className="ml-auto">
// //             {/* Show Book Now button if not authenticated */}
// //             {!isAdminAuthenticated && !showLogin && !showUserForm && (
// //               <button
// //                 className="btn btn-primary"
// //                 onClick={() => setShowUserForm(true)}  // Show UserForm when clicked
// //               >
// //                 Book Now
// //               </button>
// //             )}

// //             {/* Show Login button if not authenticated */}
// //             {!isAdminAuthenticated && !showLogin && (
// //               <button
// //                 className="ml-3 btn btn-link"
// //                 onClick={() => setShowLogin(true)}  // Show login form when clicked
// //               >
// //                 Login
// //               </button>
// //             )}
// //           </div>
// //         </nav>

// //         <div className="container mt-5">
// //           <h2>Welcome to the Event Ticketing Platform</h2>

// //           {/* Show UserForm on Book Now click */}
// //           {showUserForm && !isAdminAuthenticated && <UserForm />}

// //           {/* Conditionally render Login form */}
// //           {showLogin && !isAdminAuthenticated ? (
// //             <Login setIsAdminAuthenticated={setIsAdminAuthenticated} setShowLogin={setShowLogin} />
// //           ) : (
// //             <>
// //               {/* If authenticated, show AdminDashboard */}
// //               {isAdminAuthenticated && <AdminDashboard />}

// //               {/* If not authenticated, show UserForm */}
// //               {!isAdminAuthenticated && !showUserForm && (
// //                 <div>
// //                   <p>Click the "Book Now" button to start your booking.</p>
// //                 </div>
// //               )}
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </Router>
// //   );
// // };

// // export default App;
// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import UserForm from "./components/UserForm";
// import AdminDashboard from "./components/AdminDashboard";
// import Login from "./components/Login";

// // Import the background image
// import backgroundImage from './images/background.jpg';

// const App = () => {
//   const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); // Admin authentication state

//   return (
//     <Router>
//       <div>
//   {/* Navbar */}
//   <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "rgb(0, 0, 0)" }}>
//   <Link className="navbar-brand text-white" to="/">
//     Event Ticketing Platform
//   </Link>

//   <div className="ms-auto d-flex align-items-center">
//   {!isAdminAuthenticated ? (
//     <Link to="/login" className="btn btn-primary text-white" style={{ backgroundColor: "rgb(0, 0, 0)" }}>
//       Login (Owner)
//     </Link>
//   ) : (
//     <Link to="/dashboard" className="btn btn-success text-white"style={{ backgroundColor: "rgb(0, 0, 0)" }}>
//       Admin Dashboard
//     </Link>
//   )}
// </div>
// </nav>


//         {/* Routes */}
//         <Routes>
//           {/* Front Page (Hero Section) */}
//           <Route
//             path="/"
//             element={
//               <div
//                 className="hero-section d-flex align-items-center justify-content-center text-center"
//                 style={{
//                   backgroundImage: `url(${backgroundImage})`, // Apply the imported image
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   height: "100vh", // Full viewport height
//                   color: "white",
//                   position: "relative",
//                 }}
//               >
//                 <div
//                   className="hero-overlay"
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: "100%",
//                     backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
//                   }}
//                 ></div>

//                 <div className="hero-content" style={{ zIndex: 1 }}>
//                   <h1 className="display-4 mb-4">Welcome to the Event</h1>
//                   <Link to="/book" className="btn btn-primary btn-lg">
//                     Book Now
//                   </Link>
//                 </div>
//               </div>
//             }
//           />

//           {/* UserForm Page */}
//           <Route path="/book" element={<UserForm />} />

//           {/* Login Page */}
//           <Route
//             path="/login"
//             element={
//               <Login setIsAdminAuthenticated={setIsAdminAuthenticated} />
//             }
//           />

//           {/* Admin Dashboard Page */}
//           {isAdminAuthenticated && (
//             <Route path="/dashboard" element={<AdminDashboard />} />
//           )}

//           {/* Default Route (Redirect if no match) */}
//           <Route
//             path="*"
//             element={
//               <div className="container mt-5 text-center">
//                 <h2>Page Not Found</h2>
//                 <Link to="/" className="btn btn-primary">
//                   Go Back to Home
//                 </Link>
//               </div>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom"; // Only the routes and link needed, no Router here
import UserForm from "./components/UserForm";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";

// Import the background image
import backgroundImage from './images/background.jpg';

const App = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); // Admin authentication state

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "rgb(0, 0, 0)" }}>
        <Link className="navbar-brand text-white" to="/">
          Event Ticketing Platform
        </Link>

        <div className="ms-auto d-flex align-items-center">
          {!isAdminAuthenticated ? (
            <Link to="/login" className="btn btn-primary text-white" style={{ backgroundColor: "rgb(0, 0, 0)" }}>
              Login (Owner)
            </Link>
          ) : (
            <Link to="/dashboard" className="btn btn-success text-white" style={{ backgroundColor: "rgb(0, 0, 0)" }}>
              Admin Dashboard
            </Link>
          )}
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        {/* Front Page (Hero Section) */}
        <Route
          path="/"
          element={
            <div
              className="hero-section d-flex align-items-center justify-content-center text-center"
              style={{
                backgroundImage: `url(${backgroundImage})`, // Apply the imported image
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh", // Full viewport height
                color: "white",
                position: "relative",
              }}
            >
              <div
                className="hero-overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
                }}
              ></div>

              <div className="hero-content" style={{ zIndex: 0 }}>
                <h1 className="display-4 mb-4" style={{color:"#0bff68"}}>Welcome to the Event</h1>
                <Link to="/UserForm" className="btn btn-lg" style={{ backgroundColor: "#28a745", color: "#fff" }}>
  Book Now
</Link>

              </div>
            </div>
          }
        />

        {/* UserForm Page */}
        <Route path="/UserForm" element={<UserForm />} />

        {/* Login Page */}
        <Route
          path="/login"
          element={<Login setIsAdminAuthenticated={setIsAdminAuthenticated} />}
        />

        {/* Admin Dashboard Page */}
        {isAdminAuthenticated && (
          <Route path="/dashboard" element={<AdminDashboard />} />
        )}

        {/* Default Route (Redirect if no match) */}
        <Route
          path="*"
          element={
            <div className="container mt-5 text-center">
              <h2>Page Not Found</h2>
              <Link to="/" className="btn btn-primary">
                Go Back to Home
              </Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;


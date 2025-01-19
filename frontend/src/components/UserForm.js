// import React, { useState } from 'react';
// import axios from 'axios';
// import backgroundImage from '../images/background.png';  // Import the image

// const UserForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     paymentScreenshot: null,
//   });
//   const [message, setMessage] = useState('');  // State to store feedback message

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, paymentScreenshot: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataObj = new FormData();
//     Object.keys(formData).forEach((key) => formDataObj.append(key, formData[key]));

//     try {
//       // Send form data to the backend
//       const response = await axios.post(
//         'http://localhost:5000/api/users/submit',
//         formDataObj
//       );

//       // Handle successful submission
//       setMessage('successful submitted'); 
//       setMessage(response.data.message);  // Set success message
//       setFormData({ name: '', email: '', mobile: '', paymentScreenshot: null });  // Reset form after submission
//     } catch (err) {
//       // Check if the error is from duplicate submission
//       if (err.response && err.response.data && err.response.data.error) {
//         setMessage(err.response.data.error);  // Set duplicate user message
//       } else {
//         setMessage('Failed to submit form. Please try again.');  // General error message
//       }
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//       <div className="card" style={{ width: '400px', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//         <h3 className="text-center mb-4">User Form</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <input
//               type="text"
//               name="name"
//               className="form-control"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="email"
//               name="email"
//               className="form-control"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               name="mobile"
//               className="form-control"
//               placeholder="Mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* New Section: Image and Clickable UPI ID */}
//           <div className="mb-3 text-center">
//             <img
//               src={backgroundImage}  // Use the imported image
//               alt=""  // Empty alt attribute since it's purely decorative
//               className="img-fluid mb-2"
//               style={{ maxWidth: '50%' }}
//             />
//             <div>
//               <a 
//                 href="upi://pay?pa=yourupiid@upi&pn=YourName&mc=0000&tid=123456&url=https://example.com"  // Replace with your actual UPI ID link
//                 className="text-decoration-none" 
//                 style={{ color: '#007bff' }}
//               >
//                 Click here to pay using UPI ID: yourupiid@upi
//               </a>
//             </div>
//           </div>

//           {/* Payment Screenshot Field */}
//           <div className="mb-3">
//             <input
//               type="file"
//               name="paymentScreenshot"
//               className="form-control"
//               onChange={handleFileChange}
//               required
//             />
            
//           </div>
//           <button type="submit" className="btn btn-primary w-100">Submit</button>
//         </form>

//         {/* Display the message from the server */}
//         {message && <p className="mt-3 text-center" style={{ color: message.includes('failed') ? 'red' : 'green' }}>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default UserForm;

import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage2 from '../images/background2.jpg';  // Import the image
import backgroundImage from '../images/background.png';  // Import the image

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    paymentScreenshot: null,
  });
  const [message, setMessage] = useState('');  // State to store feedback message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, paymentScreenshot: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => formDataObj.append(key, formData[key]));

    try {
      // Send form data to the backend
      const response = await axios.post(
        'http://localhost:5000/api/users/submit',
        formDataObj
      );

      // Handle successful submission
      setMessage('successful submitted'); 
      setMessage(response.data.message);  // Set success message
      setFormData({ name: '', email: '', mobile: '', paymentScreenshot: null });  // Reset form after submission
    } catch (err) {
      // Check if the error is from duplicate submission
      if (err.response && err.response.data && err.response.data.error) {
        setMessage(err.response.data.error);  // Set duplicate user message
      } else {
        setMessage('Failed to submit form. Please try again.');  // General error message
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage2})`, // Apply background image
        backgroundSize: 'cover', // Ensure the background covers the entire page
        backgroundPosition: 'center', // Center the image
        color: 'white',
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          width: '100%',
          maxWidth: '450px',
          padding: '25px',
          borderRadius: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Slight transparent black background for the form
        }}
      >
        <h3 className="text-center mb-4 text-white">User Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                borderRadius: '5px',
                backgroundColor: '#f8f9fa',
                color: '#343a40',
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                borderRadius: '5px',
                backgroundColor: '#f8f9fa',
                color: '#343a40',
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="mobile"
              className="form-control"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              style={{
                borderRadius: '5px',
                backgroundColor: '#f8f9fa',
                color: '#343a40',
              }}
            />
          </div>

          {/* New Section: Image and Clickable UPI ID */}
          <div className="mb-3 text-center">
            <img
              src={backgroundImage}  // Use the imported image
              alt="background"
              className="img-fluid mb-2"
              style={{
                maxWidth: '60%',
                borderRadius: '5px',
              }}
            />
            <div>
              <a 
                href="upi://pay?pa=yourupiid@upi&pn=YourName&mc=0000&tid=123456&url=https://example.com"  // Replace with your actual UPI ID link
                className="text-decoration-none" 
                style={{
                  color: '#007bff',
                  fontWeight: 'bold',
                }}
              >
                Click here to pay using UPI ID: yourupiid@upi
              </a>
            </div>
          </div>

          {/* Payment Screenshot Field */}
          <div className="mb-3">
            <input
              type="file"
              name="paymentScreenshot"
              className="form-control"
              onChange={handleFileChange}
              required
              style={{
                borderRadius: '5px',
                backgroundColor: '#f8f9fa',
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: '5px' }}>
            Submit
          </button>
        </form>

        {/* Display the message from the server */}
        {message && <p className="mt-3 text-center" style={{ color: message.includes('failed') ? 'red' : 'green' }}>{message}</p>}
      </div>
    </div>
  );
};

export default UserForm;

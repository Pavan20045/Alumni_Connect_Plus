// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import API_BASE_URL from '../apiConfig';
// import './registrationform.css';

// function Signup() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm();
//   const navigate = useNavigate();

//   const onSubmit = (formData) => {
//     const data = new FormData();
//     for (const key in formData) {
//       if (key === 'profilePhoto') {
//         data.append('profilePhoto', formData.profilePhoto[0]);
//       } else if (key !== 'confirmPassword') {
//         data.append(key, formData[key]);
//       }
//     }

//     axios
//       .post(`${API_BASE_URL}/alumni/create_user`, data, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       })

//       .then(() => {
//         alert('User created successfully');
//         navigate('/Login');
//       })
//       .catch(() => {
//         alert('Something went wrong in creating user');
//       });
//   };

//   useEffect(() => {
//     document.body.style.overflow = 'auto'; // allow scroll for longer form
//   }, []);

//   return (
//     <div className="signup-container">
//       <div className="signup-card">
//         <h2 className="text-center signup-title">Alumni Registration</h2>
//         <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

//           <div className="col-md-12">
//             <label className="form-label">Profile Photo</label>
//             <input type="file" {...register('profilePhoto', { required: true })} className="form-control" />
//             {errors.profilePhoto && <span className="text-danger">Profile Photo is required</span>}
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Name</label>
//             <input type="text" {...register('name', { required: true })} className="form-control" />
//             {errors.name && <span className="text-danger">Name is required</span>}
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Username</label>
//             <input type="text" {...register('username', { required: true })} className="form-control" />
//             {errors.username && <span className="text-danger">Username is required</span>}
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Password</label>
//             <input type="password" {...register('password', { required: true })} className="form-control" />
//             {errors.password && <span className="text-danger">Password is required</span>}
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Confirm Password</label>
//             <input type="password" {...register('confirmPassword', { required: true })} className="form-control" />
//             {errors.confirmPassword && <span className="text-danger">Confirm Password is required</span>}
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Date of Birth</label>
//             <input type="date" {...register('dob', { required: true })} className="form-control" />
//             {errors.dob && <span className="text-danger">Date of Birth is required</span>}
//           </div>

//           <div className="col-md-6">
//             <label className="form-label d-block">Gender</label>
//             <div className="form-check form-check-inline">
//               <input type="radio" value="male" {...register('gender', { required: true })} className="form-check-input" id="male" />
//               <label className="form-check-label" htmlFor="male">Male</label>
//             </div>
//             <div className="form-check form-check-inline">
//               <input type="radio" value="female" {...register('gender', { required: true })} className="form-check-input" id="female" />
//               <label className="form-check-label" htmlFor="female">Female</label>
//             </div>
//             <div className="form-check form-check-inline">
//               <input type="radio" value="other" {...register('gender', { required: true })} className="form-check-input" id="other" />
//               <label className="form-check-label" htmlFor="other">Other</label>
//             </div>
//             {errors.gender && <div className="text-danger">Gender is required</div>}
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Area of Expertise</label>
//             <input type="text" {...register('areaOfExpertise', { required: true })} className="form-control" />
//             {errors.areaOfExpertise && <span className="text-danger">Required</span>}
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Professional Background</label>
//             <input type="text" {...register('professionalBackground', { required: true })} className="form-control" />
//             {errors.professionalBackground && <span className="text-danger">Required</span>}
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">LinkedIn Profile URL</label>
//             <input type="url" {...register('LinkedinUrl', { required: true })} className="form-control" />
//             {errors.LinkedinUrl && <span className="text-danger">Required</span>}
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Select College</label>
//             <select {...register('college', { required: true })} className="form-select">
//               <option value="">Select</option>
//               <option value="VNR VJIET">VNR VJIET</option>
//               <option value="CBIT">CBIT</option>
//               <option value="JNTUH">JNTUH</option>
//               <option value="GRIET">GRIET</option>
//             </select>
//             {errors.college && <span className="text-danger">Required</span>}
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Passout Year</label>
//             <input type="number" {...register('passoutYear', {
//               required: true,
//               min: 1950,
//               max: new Date().getFullYear() + 10
//             })} className="form-control" />
//             {errors.passoutYear && <span className="text-danger">Enter a valid year</span>}
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Branch</label>
//             <input type="text" {...register('Branch', { required: true })} className="form-control" />
//             {errors.Branch && <span className="text-danger">Required</span>}
//           </div>

//           <div className="col-12 text-center mt-3">
//             <button type="submit" className="btn btn-primary px-5 py-2">Submit</button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;

// src/components/signin/Register.js (or Signup.js depending on your folder)
import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./registrationform.css";
import { ApiContext } from "../../App"; // ✅ centralized API instance

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const api = useContext(ApiContext); // ✅ Access shared Axios instance

  // ✅ Handle form submission
  const onSubmit = async (formData) => {
    const data = new FormData();

    // Append all form fields
    for (const key in formData) {
      if (key === "profilePhoto") {
        data.append("profilePhoto", formData.profilePhoto[0]);
      } else if (key !== "confirmPassword") {
        data.append(key, formData[key]);
      }
    }

    try {
      await api.post("/create_user", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("User created successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong in creating user");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "auto"; // allow scroll for longer form
  }, []);

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="text-center signup-title">Alumni Registration</h2>
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Photo */}
          <div className="col-md-12">
            <label className="form-label">Profile Photo</label>
            <input
              type="file"
              {...register("profilePhoto", { required: true })}
              className="form-control"
            />
            {errors.profilePhoto && (
              <span className="text-danger">Profile Photo is required</span>
            )}
          </div>

          {/* Name */}
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="form-control"
            />
            {errors.name && <span className="text-danger">Name is required</span>}
          </div>

          {/* Username */}
          <div className="col-md-6">
            <label className="form-label">Username</label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="form-control"
            />
            {errors.username && (
              <span className="text-danger">Username is required</span>
            )}
          </div>

          {/* Passwords */}
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="form-control"
            />
            {errors.password && (
              <span className="text-danger">Password is required</span>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", { required: true })}
              className="form-control"
            />
            {errors.confirmPassword && (
              <span className="text-danger">Confirm Password is required</span>
            )}
          </div>

          {/* DOB */}
          <div className="col-md-6">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              {...register("dob", { required: true })}
              className="form-control"
            />
            {errors.dob && (
              <span className="text-danger">Date of Birth is required</span>
            )}
          </div>

          {/* Gender */}
          <div className="col-md-6">
            <label className="form-label d-block">Gender</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                value="male"
                {...register("gender", { required: true })}
                className="form-check-input"
                id="male"
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                value="female"
                {...register("gender", { required: true })}
                className="form-check-input"
                id="female"
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                value="other"
                {...register("gender", { required: true })}
                className="form-check-input"
                id="other"
              />
              <label className="form-check-label" htmlFor="other">
                Other
              </label>
            </div>
            {errors.gender && (
              <div className="text-danger">Gender is required</div>
            )}
          </div>

          {/* Area of Expertise */}
          <div className="col-md-6">
            <label className="form-label">Area of Expertise</label>
            <input
              type="text"
              {...register("areaOfExpertise", { required: true })}
              className="form-control"
            />
            {errors.areaOfExpertise && (
              <span className="text-danger">Required</span>
            )}
          </div>

          {/* Professional Background */}
          <div className="col-md-6">
            <label className="form-label">Professional Background</label>
            <input
              type="text"
              {...register("professionalBackground", { required: true })}
              className="form-control"
            />
            {errors.professionalBackground && (
              <span className="text-danger">Required</span>
            )}
          </div>

          {/* LinkedIn */}
          <div className="col-md-6">
            <label className="form-label">LinkedIn Profile URL</label>
            <input
              type="url"
              {...register("LinkedinUrl", { required: true })}
              className="form-control"
            />
            {errors.LinkedinUrl && (
              <span className="text-danger">Required</span>
            )}
          </div>

          {/* College */}
          <div className="col-md-6">
            <label className="form-label">Select College</label>
            <select
              {...register("college", { required: true })}
              className="form-select"
            >
              <option value="">Select</option>
              <option value="VNR VJIET">VNR VJIET</option>
              <option value="CBIT">CBIT</option>
              <option value="JNTUH">JNTUH</option>
              <option value="GRIET">GRIET</option>
            </select>
            {errors.college && <span className="text-danger">Required</span>}
          </div>

          {/* Passout Year */}
          <div className="col-md-6">
            <label className="form-label">Passout Year</label>
            <input
              type="number"
              {...register("passoutYear", {
                required: true,
                min: 1950,
                max: new Date().getFullYear() + 10,
              })}
              className="form-control"
            />
            {errors.passoutYear && (
              <span className="text-danger">Enter a valid year</span>
            )}
          </div>

          {/* Branch */}
          <div className="col-md-6">
            <label className="form-label">Branch</label>
            <input
              type="text"
              {...register("Branch", { required: true })}
              className="form-control"
            />
            {errors.Branch && <span className="text-danger">Required</span>}
          </div>

          <div className="col-12 text-center mt-3">
            <button type="submit" className="btn btn-primary px-5 py-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

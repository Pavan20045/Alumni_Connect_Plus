import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImage from '../../assets/background-transformed.jpeg';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (formData) => {
    delete formData.confirmPassword;
    axios.post('http://localhost:4000/alumni/create_user', formData)
      .then(() => {
        alert("User created successfully");
        navigate('/Login');
      })
      .catch(() => {
        alert("Something went wrong in creating user");
      });
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          backgroundColor: 'lightsteelblue',
          paddingBottom: '30px 40px',
          borderRadius: '20px',
          margintop:'-40%',
          width: '90%',
          height: '70%',
          maxWidth: '700px',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
          overflowY: 'auto',
          maxHeight: '90vh'
        }}
      >
        <h1
          className="text-center"
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            backgroundColor: 'white',
            display: 'inline-block',
            padding: '8px 20px',
            borderRadius: '10px',
            fontWeight: '600'
          }}
        >
          Registration Form
        </h1>
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

          <div className="col-md-12">
            <label htmlFor="profilePhoto">Profile Photo:</label>
            <input type="file" id="profilePhoto" {...register('profilePhoto', { required: true })} className="form-control" />
            {errors.profilePhoto && <span className="text-danger">Profile Photo is required</span>}
          </div>

          <div className="col-md-6">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" {...register('name', { required: true })} className="form-control" />
            {errors.name && <span className="text-danger">Name is required</span>}
          </div>

          <div className="col-md-6">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" {...register('username', { required: true })} className="form-control" />
            {errors.username && <span className="text-danger">Username is required</span>}
          </div>

          <div className="col-md-6">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" {...register('password', { required: true })} className="form-control" />
            {errors.password && <span className="text-danger">Password is required</span>}
          </div>

          <div className="col-md-6">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" {...register('confirmPassword', { required: true })} className="form-control" />
            {errors.confirmPassword && <span className="text-danger">Confirm Password is required</span>}
          </div>

          <div className="col-md-6">
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" {...register('dob', { required: true })} className="form-control" />
            {errors.dob && <span className="text-danger">Date of Birth is required</span>}
          </div>

          <div className="col-md-6">
            <label>Gender:</label>
            <div className="form-check">
              <input type="radio" {...register('gender', { required: true })} value="male" className="form-check-input" id="male" />
              <label className="form-check-label" htmlFor="male">Male</label>
            </div>
            <div className="form-check">
              <input type="radio" {...register('gender', { required: true })} value="female" className="form-check-input" id="female" />
              <label className="form-check-label" htmlFor="female">Female</label>
            </div>
            <div className="form-check">
              <input type="radio" {...register('gender', { required: true })} value="other" className="form-check-input" id="other" />
              <label className="form-check-label" htmlFor="other">Other</label>
            </div>
            {errors.gender && <span className="text-danger">Gender is required</span>}
          </div>

          <div className="col-md-6">
            <label htmlFor="areaOfExpertise">Area of Expertise:</label>
            <input type="text" id="areaOfExpertise" {...register('areaOfExpertise', { required: true })} className="form-control" />
            {errors.areaOfExpertise && <span className="text-danger">Area of Expertise is required</span>}
          </div>

          <div className="col-md-6">
            <label htmlFor="professionalBackground">Professional Background:</label>
            <input type="text" id="professionalBackground" {...register('professionalBackground', { required: true })} className="form-control" />
            {errors.professionalBackground && <span className="text-danger">Professional Background is required</span>}
          </div>

          <div className="col-md-6">
            <label htmlFor="LinkedinUrl">LinkedIn Profile URL:</label>
            <input type="text" id="LinkedinUrl" {...register('LinkedinUrl', { required: true })} className="form-control" />
            {errors.LinkedinUrl && <span className="text-danger">LinkedIn profile is required</span>}
          </div>

          <div className="col-md-6">
            <label htmlFor="college">Select College:</label>
            <select id="college" {...register('college', { required: true })} className="form-select">
              <option value="">Select College</option>
              <option value="VNR VJIET">VNR VJIET</option>
              <option value="CBIT">CBIT</option>
              <option value="JNTUH">JNTUH</option>
              <option value="GRIET">GRIET</option>
            </select>
            {errors.college && <span className="text-danger">College is required</span>}
          </div>

          <div className="col-12 text-center mt-4">
            <button type="submit" className="btn btn-primary px-4 py-2">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/background-transformed.jpeg';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="vh-100 vw-100 d-flex justify-content-center align-items-center position-relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay gradient */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
          zIndex: 1,
        }}
      ></div>

      {/* Card Container */}
      <div className="container position-relative z-2 text-white text-center">
        <h1 className="mb-4 fw-bold display-5">Welcome to Alumni Portal</h1>
        <p className="lead mb-5">Connecting Students and Alumni through a powerful platform</p>

        <div className="row justify-content-center g-4">
          <div className="col-md-4">
            <div
              className="card bg-light bg-opacity-75 shadow-lg border-0 p-4 h-100 hover-scale"
              onClick={() => navigate('/Dashboard')}
              style={{ cursor: 'pointer' }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                alt="Student"
                className="mx-auto mb-3"
                style={{ width: '70px' }}
              />
              <h4 className="fw-bold">I am a Student</h4>
              <p className="text-muted">Access student dashboard and explore alumni events.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card bg-light bg-opacity-75 shadow-lg border-0 p-4 h-100 hover-scale"
              onClick={() => navigate('/Register')}
              style={{ cursor: 'pointer' }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Alumni"
                className="mx-auto mb-3"
                style={{ width: '70px' }}
              />
              <h4 className="fw-bold">I am an Alumni</h4>
              <p className="text-muted">Register and reconnect with your institution and peers.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Hover CSS */}
      <style>{`
        .hover-scale {
          transition: transform 0.3s ease;
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default HomePage;

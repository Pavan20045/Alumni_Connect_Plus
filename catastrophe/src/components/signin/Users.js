import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';


// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDWogzqWht-9UimZ8y48chyV-sr2VKBJEE",
  authDomain: "alumniportal-9e858.firebaseapp.com",
  databaseURL: "https://alumniportal-9e858-default-rtdb.firebaseio.com",
  projectId: "alumniportal-9e858",
  storageBucket: "alumniportal-9e858.firebasestorage.app",
  messagingSenderId: "817158667343",
  appId: "1:817158667343:web:f9fdd78bd79654b113be3a",
};

// Initialize Firebase app (only once)
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = ref(database, 'alumniUsers');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userList = Object.values(data);
        setUsers(userList);
      }
    });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center text-info mb-4">Alumni Users</h2>
      <div className="row">
        {users.map((user, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card text-center h-100">
              <img
                src={user.profilePhotoBase64 || 'https://via.placeholder.com/150'}
                className="card-img-top mx-auto mt-3 rounded"
                style={{ width: '50%', height: '150px', objectFit: 'cover' }}
                alt={`${user.name}`}
              />
              <div className="card-body">
                <h5 className="card-title text-success">{user.name}</h5>
                <p className="card-text text-primary">Username: {user.username}</p>
                <p className="card-text text-success">College: {user.college}</p>
                <p className="card-text text-primary">LinkedIn:</p>
                <a
                  href={user.LinkedinUrl}
                  className="btn btn-outline-info btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;

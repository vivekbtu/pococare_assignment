import { Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

function RefreshToken() {
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);

  // Call API with token
  async function fetchData() {
    try {
      const response = await fetch('https://poco-care-assignment.onrender.com/user/signup', {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });

      // If unauthorized, try to refresh token
      if (response.status === 401) {
        const refreshedToken = await refreshAuthToken();

        // If refresh token successful, retry API call with new token
        if (refreshedToken) {
          const response = await fetch('https://poco-care-assignment.onrender.com/refresh', {
            headers: {
              'Authorization': `Bearer ${refreshedToken}`
            }
          });
          const data = await response.json();
          console.log(data);
        } else {
          setError('Could not refresh token.');
        }
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  // Refresh token using refresh-token mechanism
  async function refreshAuthToken() {
    try {
      const response = await fetch('https://poco-care-assignment.onrender.com/refresh', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        return data.token;
      } else {
        return null;
      }
    } catch (error) {
      setError(error.message);
      return null;
    }
  }

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <div>
      {error && <p>{error}</p>}
      {!token && <Button onClick={() => setToken('initial-token')}>Log in</Button>}
      {token && <p>Logged in with token: {token}</p>}
    </div>
  );
}

export default RefreshToken;

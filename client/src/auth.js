export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

export const login = (email, password) => {
  return fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("authToken", data.token); // Set token in localStorage
        return true;
      } else {
        throw new Error("Login failed");
      }
    });
};

// Helper to simulate signup (call backend for real-world scenario)
export const signup = (email, password) => {
  return fetch("http://localhost:3001/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        return true;
      } else {
        throw new Error("Signup failed");
      }
    });
};

export const logout = () => {
  localStorage.removeItem("authToken");
};

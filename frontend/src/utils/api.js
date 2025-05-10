// API utility for making requests to the backend

const API_URL = 'http://localhost:5000/api';

// Helper function for making API requests
async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth API endpoints
const authAPI = {
  register: (userData) => fetchAPI('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: async (userData) => {
    const response = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    // Store user data and token in localStorage
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },
  
  getMe: async () => {
    try {
      const userData = await fetchAPI('/auth/me');
      if (userData && userData.data) {
        // Update user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData.data));
        return userData.data;
      }
      return null;
    } catch (error) {
      console.error('Failed to get user data:', error);
      return null;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Improved isAuthenticated function
  isAuthenticated: async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      // Verify token by making a request to get current user
      const userData = await fetchAPI('/auth/me');
      // If we get here, token is valid
      if (userData && userData.data) {
        localStorage.setItem('user', JSON.stringify(userData.data));
        return true;
      }
      return false;
    } catch (error) {
      // If token is invalid, clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
  }
};

// User API endpoints
const userAPI = {
  getUsers: () => fetchAPI('/users'),
  addFriend: (friendId) => fetchAPI('/users/friends', {
    method: 'POST',
    body: JSON.stringify({ friendId }),
  }),
  getFriends: () => fetchAPI('/users/friends'),
};

// Group API endpoints
const groupAPI = {
  createGroup: (groupData) => fetchAPI('/groups', {
    method: 'POST',
    body: JSON.stringify(groupData),
  }),
  getGroups: () => fetchAPI('/groups'),
  getGroup: (id) => fetchAPI(`/groups/${id}`),
  addMember: (groupId, userId) => fetchAPI(`/groups/${groupId}/members`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  }),
};

// Expense API endpoints
const expenseAPI = {
  createExpense: (expenseData) => fetchAPI('/expenses', {
    method: 'POST',
    body: JSON.stringify(expenseData),
  }),
  getExpenses: (groupId) => fetchAPI(`/expenses${groupId ? `?group=${groupId}` : ''}`),
  getBalances: () => fetchAPI('/expenses/balances'),
};

// Export all APIs
export { authAPI, userAPI, groupAPI, expenseAPI };
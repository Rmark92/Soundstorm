export const signup = (credentials) => {
  return $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user: credentials }
  });
};

export const login = (credentials) => {
  return $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user: credentials }
  });
};

export const logout = () => {
  return $.ajax({
    method: 'DELETE',
    url: '/api/session'
  });
};

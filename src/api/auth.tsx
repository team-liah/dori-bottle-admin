export const login = async (username: string, password: string) => {
  localStorage.setItem('token', `Bearer ${username} ${password}`);

  return;
};

export const getUser = async (username) => {
  const response = await fetch(`http://localhost:5217/api/users/${username}`);
  const data = await response.json();
  return data;
};

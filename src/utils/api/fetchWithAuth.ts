const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  const response = await fetch(url, {
    ...options,
  });

  return response;
};

export default fetchWithAuth;

export const setCookie = (name: string, data: string) => {
  document.cookie = `${name}=${data}; path=/`;
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split(";");
  const formattedName = `${name}=`;

  for (const cookie of cookies) {
    if (cookie.startsWith(formattedName))
      return cookie.substring(formattedName.length, cookie.length);
  }
  return null;
};

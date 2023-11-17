// useGetUserInfo

export const useGetUserInfo = () => {
  const { name, picture, userID, isAuth } =
    JSON.parse(localStorage.getItem("auth")) || {};

  return { name, picture, userID, isAuth };
};
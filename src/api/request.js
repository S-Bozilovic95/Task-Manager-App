import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const request = async ({ ...options }) => {
  const onSuccess = (response) => response;
  const onError = (error) => {
    console.log(error);
  };

  try {
    const response = await axiosInstance(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

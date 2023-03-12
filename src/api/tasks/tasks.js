import { request } from "../request";

export const getAllTasks = () => {
  return request({
    url: "/tasks.json",
    method: "get",
  });
};

export const getSingleTask = (id) => {
  return request({
    url: `/tasks/${id}.json`,
    method: "get",
  });
};

export const updateTask = (id, userData) => {
  return request({
    url: `/tasks/${id}.json`,
    method: "patch",
    data: userData,
  });
};

export const addNewTask = (userData) => {
  return request({
    url: "/tasks.json",
    method: "post",
    data: userData,
  });
};

export const deleteTask = (id) => {
  return request({
    url: `/tasks/${id}.json`,
    method: "delete",
  });
};

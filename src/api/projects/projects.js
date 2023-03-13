import { request } from "../request";

export const getAllProjects = () => {
  return request({
    url: "/projects.json",
    method: "get",
  });
};

export const getSingleProject = (id) => {
  return request({
    url: `/projects/${id}.json`,
    method: "get",
  });
};

export const updateProject = (id, userData) => {
  return request({
    url: `/projects/${id}.json`,
    method: "patch",
    data: userData,
  });
};

export const addNewProject = (userData) => {
  return request({
    url: "/projects.json",
    method: "post",
    data: userData,
  });
};

export const deleteProject = (id) => {
  return request({
    url: `/projects/${id}.json`,
    method: "delete",
  });
};

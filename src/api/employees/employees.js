import { request } from "../request";

export const getAllEmployees = () => {
  return request({
    url: "/employees.json",
    method: "get",
  });
};

export const getSingleEmployee = (id) => {
  return request({
    url: `/employees/${id}.json`,
    method: "get",
  });
};

export const addNewEmployee = (userData) => {
  return request({
    url: "/employees.json",
    method: "post",
    data: userData,
  });
};

export const updateEmployee = (id, userData) => {
  return request({
    url: `/employees/${id}.json`,
    method: "patch",
    data: userData,
  });
};

export const deleteEmployee = (id) => {
  return request({
    url: `/employees/${id}.json`,
    method: "delete",
  });
};

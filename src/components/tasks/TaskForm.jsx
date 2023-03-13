import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../../api/projects/projects";
import { updateTask, addNewTask, getSingleTask } from "../../api/tasks/tasks";
import {
  getEmployeeData,
  initialEmployeeList,
} from "../../store/employeeSlice";
import { getProjectData, initialProjectList } from "../../store/projectSlice";
import {
  currentTaskId,
  getTaskData,
  setCurrentTaskId,
} from "../../store/taskSlice";
import PopUp from "../UI/PopUp";
import classes from "./TaskForm.module.scss";

const TaskForm = ({ showDialogHandler }) => {
  const id = useSelector(currentTaskId);
  const employeeList = useSelector(initialEmployeeList);
  const projectList = useSelector(initialProjectList);
  const mode = id ? "update" : "add";
  const dispatch = useDispatch();
  const [taskItem, setTaskItem] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignee: "",
    project: "",
  });

  const changeHandler = (event) => {
    event.preventDefault();
    setTaskItem((prevTaskItem) => ({
      ...prevTaskItem,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = async (itemData, event) => {
    event.preventDefault();
    try {
      if (mode === "update") {
        const response = await updateTask(id, itemData);
        //   add popup here
      } else {
        const response = await addNewTask(itemData);
      }

      dispatch(getTaskData());
      handleCancel();
    } catch (error) {
      console.log(error.mesasge);
    }
  };

  const handleCancel = () => {
    setTaskItem({
      title: "",
      description: "",
      dueDate: "",
      assignee: "",
      project: "",
    });
    dispatch(setCurrentTaskId(null));
    showDialogHandler(false);
  };

  useEffect(() => {
    if (id) {
      const getTask = async () => {
        try {
          const response = await getSingleTask(id);
          setTaskItem(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getTask();
    }
  }, [id]);

  useEffect(() => {
    dispatch(getEmployeeData());
    dispatch(getProjectData());
  }, [dispatch]);

  return (
    <PopUp onClose={showDialogHandler.bind(this, false)}>
      <h4>{mode} Task Data</h4>
      <form
        onSubmit={submitHandler.bind(this, taskItem)}
        className={classes["task-form"]}
      >
        <label>
          Title:
          <input
            type="text"
            value={taskItem.title}
            name="title"
            onChange={changeHandler}
          />
        </label>
        <label>
          Description:
          <textarea
            type="text"
            value={taskItem.description}
            name="description"
            onChange={changeHandler}
            placeholder={"Description"}
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            value={taskItem.dueDate}
            name="dueDate"
            onChange={changeHandler}
          />
        </label>

        <div className={classes["options-box"]}>
          <label>
            Assignee:
            <select
              value={taskItem.assignee}
              name="assignee"
              onChange={changeHandler}
            >
              <option value=""></option>
              {employeeList?.map((item) => {
                return (
                  <option key={item.id} value={item.fullName}>
                    {item.fullName}
                  </option>
                );
              })}
            </select>
          </label>

          <label>
            Project:
            <select
              value={taskItem.project}
              name="project"
              onChange={changeHandler}
            >
              <option value=""></option>
              {projectList?.map((item) => {
                return (
                  <option key={item.id} value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </select>
          </label>
        </div>

        <div className={classes["button-box"]}>
          <button type="submit">{mode}</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </PopUp>
  );
};

export default TaskForm;

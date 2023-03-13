import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProject,
  getSingleProject,
  updateProject,
} from "../../api/projects/projects";
import {
  currentProjectId,
  getProjectData,
  setCurrentProjectId,
} from "../../store/projectSlice";
import PopUp from "../UI/PopUp";
import classes from "./ProjectForm.module.scss";

const TaskForm = ({ showDialogHandler }) => {
  const id = useSelector(currentProjectId);
  const mode = id ? "update" : "add";
  const dispatch = useDispatch();
  const [projectItem, setProjectItem] = useState({
    title: "",
  });

  const changeHandler = (event) => {
    event.preventDefault();
    setProjectItem((prevProjectItem) => ({
      ...prevProjectItem,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = async (itemData, event) => {
    event.preventDefault();
    try {
      if (mode === "update") {
        const response = await updateProject(id, itemData);
        //   add popup here
      } else {
        const response = await addNewProject(itemData);
      }
      dispatch(getProjectData());
      handleCancel();
    } catch (error) {
      console.log(error.mesasge);
    }
  };

  const handleCancel = () => {
    setProjectItem({
      title: "",
    });
    dispatch(setCurrentProjectId(null));
    showDialogHandler(false);
  };

  useEffect(() => {
    if (id) {
      const getProject = async () => {
        try {
          const response = await getSingleProject(id);
          setProjectItem(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getProject();
    }
  }, [id]);

  return (
    <PopUp onClose={showDialogHandler.bind(this, false)}>
      <h4>{mode} Task Data</h4>
      <form
        onSubmit={submitHandler.bind(this, projectItem)}
        className={classes["project-form"]}
      >
        <label>
          Title:
          <input
            type="text"
            value={projectItem.title}
            name="title"
            onChange={changeHandler}
          />
        </label>

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

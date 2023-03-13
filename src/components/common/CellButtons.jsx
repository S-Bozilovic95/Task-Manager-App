import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../../api/employees/employees";
import { deleteProject } from "../../api/projects/projects";
import { deleteTask } from "../../api/tasks/tasks";
import {
  getEmployeeData,
  setCurrentEmployeeId,
} from "../../store/employeeSlice";
import { getProjectData, setCurrentProjectId } from "../../store/projectSlice";
import { getTaskData, setCurrentTaskId } from "../../store/taskSlice";
import classes from "./CellButtons.module.scss";

const CellButtons = (props) => {
  const dispatch = useDispatch();

  const itemIdHandler = () => {
    if (props.type === "task") {
      dispatch(setCurrentTaskId(props.data.id));
      props.showDialogHandler(true);
    } else if (props.type === "employee") {
      dispatch(setCurrentEmployeeId(props.data.id));
      props.showDialogHandler(true);
    } else {
      dispatch(setCurrentProjectId(props.data.id));
      props.showDialogHandler(true);
    }
  };

  const deleteItemHandler = async () => {
    try {
      if (props.type === "task") {
        await deleteTask(props.data.id);
        dispatch(getTaskData());
      } else if (props.type === "employee") {
        await deleteEmployee(props.data.id);
        dispatch(getEmployeeData());
      } else {
        await deleteProject(props.data.id);
        dispatch(getProjectData());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes["cell-buttons"]}>
      <i onClick={itemIdHandler}>
        <AiFillEdit />
      </i>

      <i onClick={deleteItemHandler}>
        <AiFillDelete />
      </i>
    </div>
  );
};

export default CellButtons;

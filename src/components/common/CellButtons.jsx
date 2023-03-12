import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../../api/employees/employees";
import { deleteTask } from "../../api/tasks/tasks";
import {
  getEmployeeData,
  setCurrentEmployeeId,
} from "../../store/employeeSlice";
import { getTaskData, setCurrentTaskId } from "../../store/taskSlice";
import classes from "./CellButtons.module.scss";

const CellButtons = (props) => {
  const dispatch = useDispatch();

  const itemIdHandler = () => {
    if (props.type === "task") {
      dispatch(setCurrentTaskId(props.data.id));
      props.showDialogHandler(true);
    } else {
      dispatch(setCurrentEmployeeId(props.data.id));
      props.showDialogHandler(true);
    }
  };

  const deleteItemHandler = async () => {
    try {
      if (props.type === "task") {
        await deleteTask(props.data.id);
        dispatch(getTaskData());
      } else {
        await deleteEmployee(props.data.id);
        dispatch(getEmployeeData());
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

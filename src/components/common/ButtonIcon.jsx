import { MdLibraryAdd } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import classes from "./ButtonIcon.module.scss";

const ButtonIcon = ({ type, showDialogHandler }) => {
  return (
    <button
      onClick={showDialogHandler.bind(this, true)}
      className={classes.button}
    >
      {type === "task" && (
        <i>
          <MdLibraryAdd />
        </i>
      )}
      {type === "employee" && (
        <i>
          <AiOutlineUserAdd />
        </i>
      )}
      <span>Add new {type}</span>
    </button>
  );
};

export default ButtonIcon;

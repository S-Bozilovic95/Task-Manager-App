import { useState } from "react";
import ButtonIcon from "../components/common/ButtonIcon";
import OverviewTable from "../components/common/OverviewTable";
import TaskForm from "../components/tasks/TaskForm";

const TasksPage = () => {
  const [showDialog, setshowDialog] = useState(false);

  const showDialogHandler = (value) => {
    setshowDialog(value);
  };

  return (
    <>
      <ButtonIcon type={"task"} showDialogHandler={showDialogHandler} />
      <OverviewTable type={"task"} showDialogHandler={showDialogHandler} />
      {showDialog && <TaskForm showDialogHandler={showDialogHandler} />}
    </>
  );
};

export default TasksPage;

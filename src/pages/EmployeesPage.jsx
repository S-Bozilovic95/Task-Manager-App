import { useState } from "react";
import ButtonIcon from "../components/common/ButtonIcon";
import OverviewTable from "../components/common/OverviewTable";
import EmployeeForm from "../components/employees/EmployeeForm";

const EmployeesPage = () => {
  const [showDialog, setshowDialog] = useState(false);

  const showDialogHandler = (value) => {
    setshowDialog(value);
  };
  return (
    <>
      <ButtonIcon type={"employee"} showDialogHandler={showDialogHandler} />
      <OverviewTable type={"employee"} showDialogHandler={showDialogHandler} />
      {showDialog && <EmployeeForm showDialogHandler={showDialogHandler} />}
    </>
  );
};

export default EmployeesPage;

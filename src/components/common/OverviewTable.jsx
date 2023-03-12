import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useDispatch, useSelector } from "react-redux";
import { getTaskData, initialTaskList } from "../../store/taskSlice";
import CellButtons from "./CellButtons";
import { useEffect } from "react";
import {
  getEmployeeData,
  initialEmployeeList,
} from "../../store/employeeSlice";

const OverviewTable = ({ type, showDialogHandler }) => {
  const tasksList = useSelector(initialTaskList);
  const employeesList = useSelector(initialEmployeeList);
  const dispatch = useDispatch();

  const gridOptions = {
    defaultColDef: {
      cellStyle: { textAlign: "left" },
    },
  };

  const columnDefsTasks = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 1.5 },
    { field: "dueDate", headerName: "Due Date", flex: 1 },
    { field: "assignee", headerName: "Assignee", flex: 1 },
    { field: "project", headerName: "Project", flex: 1 },
    {
      flex: 0.5,
      cellRenderer: CellButtons,
      cellRendererParams: {
        type: "task",
        showDialogHandler: showDialogHandler,
      },
    },
  ];

  const columnDefsEmployees = [
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
    { field: "dateOfBirth", headerName: "Date of Birth", flex: 1 },
    { field: "monthlySalary", headerName: "Monthly Salary", flex: 1 },
    {
      flex: 1,
      cellRenderer: CellButtons,
      cellRendererParams: {
        type: "employee",
        showDialogHandler: showDialogHandler,
      },
    },
  ];

  useEffect(() => {
    if (type === "task") {
      dispatch(getTaskData());
    } else {
      dispatch(getEmployeeData());
    }
  }, [dispatch, type]);

  return (
    <div className="ag-theme-alpine" style={{ height: 700, width: "100%" }}>
      <AgGridReact
        rowData={type === "task" ? tasksList : employeesList}
        columnDefs={type === "task" ? columnDefsTasks : columnDefsEmployees}
        gridOptions={gridOptions}
      ></AgGridReact>
    </div>
  );
};

export default OverviewTable;

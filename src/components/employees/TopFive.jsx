import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskData, initialTaskList, isLoading } from "../../store/taskSlice";
import ChartBar from "../UI/ChartBar";

const TopFive = () => {
  const taskList = useSelector(initialTaskList);
  const loading = useSelector(isLoading);
  const dispatch = useDispatch();
  const month = new Date().getMonth();
  const pastMonth = month === 0 ? "01" : month?.toString().padStart(2, "0");
  const year = new Date().getFullYear();
  const [topFiveEmployees, setTopFiveEmployees] = useState([
    { name: "", data: [] },
  ]);

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  }

  const findTopFive = useCallback(() => {
    const filteredTasks = taskList?.filter(
      (item) =>
        item.dueDate >= `${year}-${pastMonth}-01` &&
        item.dueDate <= `${year}-${pastMonth}-31`
    );

    if (filteredTasks?.length > 0) {
      const assigneeCounts = filteredTasks.reduce((times, task) => {
        if (times.hasOwnProperty(task.assignee)) {
          times[task.assignee] = {
            ...times[task.assignee],
            data: times[task.assignee].data + 1,
          };
        } else {
          times[task.assignee] = {
            name: task.assignee,
            data: 1,
          };
        }
        return times;
      }, {});

      const sorted = Object.values(assigneeCounts).sort(
        (a, b) => b.data - a.data
      );

      const topFiveEmployees = sorted.slice(0, 5);
      setTopFiveEmployees(topFiveEmployees);
    }
  }, [pastMonth, taskList, year]);

  useEffect(() => {
    dispatch(getTaskData());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      findTopFive();
    }
  }, [loading, findTopFive]);

  return (
    <div>
      <ChartBar
        items={topFiveEmployees}
        title={`Largest number of tasks completed in ${getMonthName(
          pastMonth
        )}`}
      />
    </div>
  );
};

export default TopFive;

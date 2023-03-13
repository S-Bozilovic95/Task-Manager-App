import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskData, initialTaskList, isLoading } from "../../store/taskSlice";
import ChartBar from "../UI/ChartBar";

const ProjectStats = () => {
  const taskList = useSelector(initialTaskList);
  const loading = useSelector(isLoading);
  const dispatch = useDispatch();

  const [mostCommonProjects, setMostCommonProjects] = useState([
    { name: "", data: [] },
  ]);

  const findMostCommon = useCallback(() => {
    if (taskList?.length > 0) {
      const projectCounts = taskList.reduce((item, task) => {
        if (item.hasOwnProperty(task.project)) {
          item[task.project] = {
            ...item[task.project],
            data: item[task.project].data + 1,
          };
        } else {
          item[task.project] = {
            name: task.project,
            data: 1,
          };
        }
        return item;
      }, {});

      const sortedProjects = Object.values(projectCounts).sort(
        (a, b) => b.data - a.data
      );

      const mostCommonProjects = sortedProjects.slice(0, 5);
      setMostCommonProjects(mostCommonProjects);
    }
  }, [taskList]);
  console.log(mostCommonProjects);

  useEffect(() => {
    dispatch(getTaskData());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      findMostCommon();
    }
  }, [loading, findMostCommon]);

  return (
    <>
      <ChartBar
        items={mostCommonProjects}
        title={"projects with the most tasks"}
      />
    </>
  );
};

export default ProjectStats;

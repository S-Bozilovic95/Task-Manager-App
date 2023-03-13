import { useState } from "react";
import ButtonIcon from "../components/common/ButtonIcon";
import OverviewTable from "../components/common/OverviewTable";
import TopFive from "../components/employees/TopFive";
import ProjectForm from "../components/projects/ProjectForm";
import ProjectStats from "../components/projects/ProjectStats";

const ProjectsPage = () => {
  const [showDialog, setshowDialog] = useState(false);

  const showDialogHandler = (value) => {
    setshowDialog(value);
  };
  return (
    <>
      <div className="chart-box">
        <ProjectStats />
        <TopFive />
      </div>
      <ButtonIcon type={"project"} showDialogHandler={showDialogHandler} />
      <OverviewTable type={"project"} showDialogHandler={showDialogHandler} />
      {showDialog && <ProjectForm showDialogHandler={showDialogHandler} />}
    </>
  );
};

export default ProjectsPage;

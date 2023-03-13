import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.scss";
import { useState } from "react";

const MainNavigation = () => {
  const [drop, setDrop] = useState(false);

  const dropHandler = () => {
    setDrop((prevDrop) => !prevDrop);
  };

  return (
    <div className={`${classes.navigation} ${drop && classes["active-menu"]}`}>
      <div className={classes.content}>
        <div className={classes["logo-box"]}>
          <div className={classes.menu} onClick={dropHandler}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={classes.logo}>
            <h4>
              <span>Task</span>Board
            </h4>
          </div>
        </div>

        <div className={classes["link-box"]}>
          <NavLink to="/" onClick={dropHandler}>
            Employees
          </NavLink>
          <NavLink to="/tasks" onClick={dropHandler}>
            Tasks
          </NavLink>
          <NavLink to="/projects" onClick={dropHandler}>
            Projects
          </NavLink>
        </div>
      </div>
      <div className={classes.overlay} onClick={dropHandler}></div>
    </div>
  );
};

export default MainNavigation;

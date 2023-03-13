import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeesPage from "./pages/EmployeesPage";
import TasksPage from "./pages/TasksPage";
import PagesLayout from "./pages/PagesLayout";
import ProjectsPage from "./pages/ProjectsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PagesLayout />}>
            <Route path="/" element={<EmployeesPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

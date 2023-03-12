import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmployeesPage from "./pages/EmployeesPage";
import TasksPage from "./pages/TasksPage";
import PagesLayout from "./pages/PagesLayout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PagesLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/tasks" element={<TasksPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

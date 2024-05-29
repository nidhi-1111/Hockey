import "./App.css";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Summary from "./pages/summary";
import Teams from "./pages/teamInfo";
import Statistics from "./pages/statistics";

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<Navigate to="/NHLSummary" />} />
          <Route path="/NHLSummary" element={<Summary />} />
          <Route path="/NHLTeams/:teamName" element={<Teams />} />
          <Route path="/NHLAllStats" element={<Statistics />} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

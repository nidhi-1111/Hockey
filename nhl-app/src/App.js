import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Summary from "./pages/summary";
import Teams from "./pages/teamInfo";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/NHLSummary" />} />
          <Route path="/NHLSummary" element={<Summary />} />
          <Route path="/NHLTeams/:teamName" element={<Teams />} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

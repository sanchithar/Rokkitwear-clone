import { Route, Routes } from 'react-router-dom';
import { SchoolLandingPage } from '../pages/SchoolLandingPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<SchoolLandingPage />} />
      <Route path="/schools" element={<SchoolLandingPage />} />
    </Routes>
  );
}

export default App;

import { Navigate, Route, Routes } from 'react-router-dom';
import { ScrollingPage } from './ScrollingPage';

export const ScrollingPageRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<ScrollingPage />} />
    </Routes>
  );
};

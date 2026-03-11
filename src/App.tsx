import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BoardList from './pages/BoardList';
import BoardDetail from './pages/BoardDetail';
import BoardCreate from './pages/BoardCreate';
import BoardEdit from './pages/BoardEdit';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<BoardList />} />
          <Route path="/boards/new" element={<BoardCreate />} />
          <Route path="/boards/:id" element={<BoardDetail />} />
          <Route path="/boards/:id/edit" element={<BoardEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

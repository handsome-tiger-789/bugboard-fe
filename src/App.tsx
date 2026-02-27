import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import PostCreate from './pages/PostCreate';
import PostEdit from './pages/PostEdit';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/new" element={<PostCreate />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/:id/edit" element={<PostEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

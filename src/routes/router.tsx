import { createBrowserRouter } from 'react-router-dom';
import HomePage from 'pages/home/HomePage';
import VideosPage from 'pages/videos/VideosPage';
import StickersPage from 'pages/stickers/StickersPage';
import GifsPage from 'pages/gifs/GifsPage';
import PageNotFound from 'pages/404/PageNotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/gifs',
    element: <GifsPage />,
  },
  {
    path: '/videos',
    element: <VideosPage />,
  },
  {
    path: '/stickers',
    element: <StickersPage />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export default router;

import Landing from '@/features/misc/routes/Landing';
import { ScrollingPageRoutes } from '@/features/scrollingPage';
import { useRoutes } from 'react-router-dom';

export const AppRoutes = () => {
  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: '/test/*', element: <ScrollingPageRoutes /> },
  ];
  const element = useRoutes([...commonRoutes]);

  return <>{element}</>;
};

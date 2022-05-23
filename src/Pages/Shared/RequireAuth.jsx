import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import SpinnerFullScreen from './SpinnerFullScreen';
import { auth } from '../../firebase.init';

const RequireAuth = ({ children }) => {
  const [authUser, authLoading] = useAuthState(auth);
  const location = useLocation();

  if (authLoading) <SpinnerFullScreen />;

  if (!authUser)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default RequireAuth;

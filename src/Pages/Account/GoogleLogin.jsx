import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase.init';

import googleIcon from '../../Assets/icons/google.png';
import SpinnerFullScreen from '../Shared/SpinnerFullScreen';
import Error from '../Shared/Error';

const GoogleLogin = ({ from }) => {
  const navigate = useNavigate();
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  // Navigates to "from"
  useEffect(() => {
    if (googleUser) {
      navigate(from, { replace: true });
    }
  }, [googleUser, navigate, from]);

  if (googleLoading) {
    return <SpinnerFullScreen />;
  }

  return (
    <div>
      <button
        onClick={() => signInWithGoogle()}
        className="btn btn-outline rounded w-full flex items-center gap-3"
      >
        <img className="w-6 h-6" src={googleIcon} alt="Google" />
        Login with Google
      </button>
      {googleError?.message && <Error error={googleError?.message} />}
    </div>
  );
};

export default GoogleLogin;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase.init';

import googleIcon from '../../Assets/icons/google.png';
import SpinnerFullScreen from '../Shared/SpinnerFullScreen';
import Error from '../Shared/Error';

import { useUpdateUserGetToken } from '../../Hooks/useUpdateUserGetToken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const GoogleLogin = ({ from }) => {
  const navigate = useNavigate();
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  const onSuccess = (data) => {
    navigate(from, { replace: true });
  };

  const onError = (error) => {
    toast.error(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>
            {error?.message || 'Error saving user to DB and generating JWT.'}
          </p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'errorGoogleLoginUpdateUserGetToken',
      }
    );
  };

  const { mutateAsync, isLoading } = useUpdateUserGetToken({
    onSuccess,
    onError,
  });

  // Generates JWT after successful login
  useEffect(() => {
    if (googleUser?.user) {
      mutateAsync({
        uid: googleUser.user.uid,
      });
    }
  }, [googleUser, mutateAsync]);

  // Navigates to "from"
  useEffect(() => {
    if (googleUser) {
      navigate(from, { replace: true });
    }
  }, [googleUser, navigate, from]);

  if (googleLoading || isLoading) {
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

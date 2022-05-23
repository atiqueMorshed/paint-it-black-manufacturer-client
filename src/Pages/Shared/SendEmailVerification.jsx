import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useAuthState,
  useSendEmailVerification,
} from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { auth } from '../../firebase.init';
import SpinnerFullScreen from './SpinnerFullScreen';

const SendEmailVerification = () => {
  const [authUser, authLoading] = useAuthState(auth);
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);

  const handleSendVerification = async () => {
    await sendEmailVerification();
  };

  if (authLoading) {
    return <SpinnerFullScreen />;
  }
  if (sending) {
    return toast.success(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>Sending verification email.</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'sendingVerification',
      }
    );
  }
  if (error) {
    return toast.error(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>{error?.message || 'Failed to send verification email.'}</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'errorSendingVerification',
      }
    );
  }
  if (authUser?.emailVerified === false) {
    return toast.error(
      (t) => (
        <div className="flex gap-3 items-center">
          <div className="flex flex-col justify-center items-start">
            <p className="font-medium">Email not verified.</p>
            <button onClick={handleSendVerification} className="btn btn-xs">
              send
            </button>
          </div>
          <FontAwesomeIcon
            className="cursor-pointer p-2 px-3 rounded-full border"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 9999999,
        id: 'sendVerification',
      }
    );
  }
};

export default SendEmailVerification;

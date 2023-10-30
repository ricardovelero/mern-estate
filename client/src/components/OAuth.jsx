import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { authSuccess, authStart, authFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const { loading, error } = useSelector((state) => state.user);
  // const loading = false
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      dispatch(authStart());
      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(authFailure(data.message));
        return;
      }
      dispatch(authSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(authFailure(error.message));
      console.log('Could not log in with Google');
    }
  };
  return (
    <>
      <button
        disabled={loading}
        onClick={handleGoogleClick}
        type='button'
        className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
      >
        Continue with Google
      </button>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </>
  );
}

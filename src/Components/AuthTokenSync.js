import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setAuthToken } from '../Services/Api_services';

const AuthTokenSync = () => {
  const userData = useSelector(state => state.AUTH.userData);

  useEffect(() => {
    setAuthToken(userData?.token ?? null);
  }, [userData?.token]);

  return null;
};

export default AuthTokenSync;

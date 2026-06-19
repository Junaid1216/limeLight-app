import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  REMOVE_ROLE_DATA,
  ROLE_DATA,
} from '../Redux/Slices/RoleSlice';

const RoleContext = createContext({
  role: null,
  setRole: () => {},
});

export const RoleProvider = ({ children }) => {
  const dispatch = useDispatch();
  const role = useSelector(state => state?.ROLE?.userData);

  const setRole = useCallback(
    value => {
      if (value === null) {
        dispatch(REMOVE_ROLE_DATA());
      } else {
        dispatch(ROLE_DATA(value));
      }
    },
    [dispatch],
  );

  const value = useMemo(
    () => ({
      role,
      setRole,
    }),
    [role, setRole],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export const useRole = () => useContext(RoleContext);

import React, { createContext, useContext, useMemo, useState } from 'react';
import { ROLES } from '../Constants/roleConfig';

const RoleContext = createContext({
  role: ROLES.STAFF,
  setRole: () => {},
});

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(ROLES.STAFF);

  const value = useMemo(
    () => ({
      role,
      setRole,
    }),
    [role],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export const useRole = () => useContext(RoleContext);

import React, { createContext, useContext, useMemo, useState } from 'react';

const RoleContext = createContext({
  role: null,
  setRole: () => {},
});

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);

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

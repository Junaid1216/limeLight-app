import React from 'react';

export const SurveyResponseContext = React.createContext({
  responses: [],
  isLoading: false,
});

export const SurveyResponseProvider = ({ children, value }) => (
  <SurveyResponseContext.Provider value={value}>
    {children}
  </SurveyResponseContext.Provider>
);

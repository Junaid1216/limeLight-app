import { createSlice } from '@reduxjs/toolkit';
import { REMOVE_USER_DATA } from './AuthSlice';

const initialState = {
  submittedSurveyIds: {},
  activeSurveyId: null,
  hasPendingSurveys: true,
};

const SurveySlice = createSlice({
  name: 'SurveySlice',
  initialState,
  reducers: {
    setActiveSurveyId: (state, action) => {
      state.activeSurveyId = action.payload ?? null;
    },
    setHasPendingSurveys: (state, action) => {
      state.hasPendingSurveys = Boolean(action.payload);
    },
    markSurveySubmitted: (state, action) => {
      const surveyId = action.payload;

      if (surveyId == null) {
        return;
      }

      state.submittedSurveyIds[String(surveyId)] = true;
      state.activeSurveyId = surveyId;
    },
    clearSurveyState: state => {
      state.submittedSurveyIds = {};
      state.activeSurveyId = null;
      state.hasPendingSurveys = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(REMOVE_USER_DATA, state => {
      state.submittedSurveyIds = {};
      state.activeSurveyId = null;
      state.hasPendingSurveys = true;
    });
  },
});

export const selectActiveSurveyId = state => state?.SURVEY?.activeSurveyId;

export const selectIsSurveySubmitted = (state, surveyId) => {
  const id = surveyId ?? state?.SURVEY?.activeSurveyId;

  if (id == null) {
    return false;
  }

  return Boolean(state?.SURVEY?.submittedSurveyIds?.[String(id)]);
};

export const selectHasSubmittedSurvey = state =>
  Object.keys(state?.SURVEY?.submittedSurveyIds ?? {}).length > 0;

export const selectHasPendingSurveys = state =>
  state?.SURVEY?.hasPendingSurveys !== false;

export default SurveySlice.reducer;
export const {
  setActiveSurveyId,
  setHasPendingSurveys,
  markSurveySubmitted,
  clearSurveyState,
} = SurveySlice.actions;

import { AUTH, COMPANY, PROFILE, RECENT } from './Constants';

export const Reducer = (state, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        user: action.user,
      };
    case PROFILE:
      return {
        ...state,
        stateProfile: action.profile,
      };
    case COMPANY:
      return {
        ...state,
        company: action.companies,
      };

    case RECENT:
      return {
        ...state,
        recents: action.recentViewed,
      };
    default:
      return state;
  }
};

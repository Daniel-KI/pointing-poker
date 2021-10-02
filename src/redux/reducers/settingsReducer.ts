import { ISettingsAction, SET_SETTINGS } from '../actions/settingsActions';
import { ISettings } from '../models';

const initialState: ISettings = {
  isAdminObserver: true,
  timer: null,
  scoreType: '',
  scoreTypeShort: '',
  cardValues: [],
  cardBack: '',
  addNewPlayersAutomatically: true,
  cardsFlipAutomatically: true,
};

const settingsReducer = (state = initialState, action: ISettingsAction): ISettings => {
  switch (action.type) {
    case SET_SETTINGS:
      return { ...action.settings };
    default:
      return state;
  }
};

export default settingsReducer;

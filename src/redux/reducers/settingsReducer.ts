import { ISettingsAction, SET_SETTINGS } from '../actions/settingsActions';
import { ISettings } from '../models';

const initialState: ISettings = {
  isAdminObserver: true,
  timer: {
    minutes: 0,
    seconds: 20,
  },
  scoreType: 'SP',
  cardValues: ['', '2', '6', '12', ''],
  cardBack: 'type1',
  addNewPlayersAutomatically: true,
  cardsFlipAutomatically: false,
  canChangeChoice: false,
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

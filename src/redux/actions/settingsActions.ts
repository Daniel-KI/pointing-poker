import { ISettings, ITimer } from '../models';

export const SET_SETTINGS = 'SET_SETTINGS';
export const UPDATE_TIMER = 'UPDATE_TIMER';

interface ISettingsAction {
  type: typeof SET_SETTINGS;
  settings: ISettings;
}

interface ITimerAction {
  type: typeof UPDATE_TIMER;
  timer: ITimer;
}

export type SettingsActionsType = ISettingsAction | ITimerAction;

export const updateSettings = (settings: ISettings): ISettingsAction => {
  return {
    type: SET_SETTINGS,
    settings,
  };
};

export const updateTimer = (timer: ITimer): ITimerAction => {
  return {
    type: UPDATE_TIMER,
    timer,
  };
};

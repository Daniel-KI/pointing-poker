import { ISettings } from '../models';

export const SET_SETTINGS = 'SET_SETTINGS';

export interface ISettingsAction {
  type: typeof SET_SETTINGS;
  settings: ISettings;
}

export const updateSettings = (settings: ISettings): ISettingsAction => {
  return {
    type: SET_SETTINGS,
    settings,
  };
};

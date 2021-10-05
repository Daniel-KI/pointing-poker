import { ISettings } from '../../models';
import settingsReducer from '../settingsReducer';
import { updateSettings } from '../../actions/settingsActions';

const testState: ISettings = {
  isAdminObserver: true,
  timer: null,
  scoreType: '',
  cardValues: [],
  cardBack: 'type1',
  addNewPlayersAutomatically: true,
  cardsFlipAutomatically: true,
};

describe('Test settingsReducer', () => {
  it('Set settings', () => {
    const newSettings: ISettings = {
      isAdminObserver: false,
      timer: {
        minutes: 15,
        seconds: 20,
      },
      scoreType: 'hour',
      cardValues: ['1', '3', '5'],
      cardBack: 'type3',
      addNewPlayersAutomatically: false,
      cardsFlipAutomatically: false,
    };
    const newState = settingsReducer(testState, updateSettings(newSettings));
    expect(newState).toStrictEqual(expect.objectContaining(newSettings));
    expect(newState).toStrictEqual(newSettings);
    expect(newState.timer).toStrictEqual(expect.anything());
  });
});

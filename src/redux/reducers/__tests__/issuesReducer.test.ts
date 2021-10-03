import { IIssue } from '../../models';
import issuesReducer from '../issuesReducer';
import { addIssue, updateIssue, removeIssue } from '../../actions/issuesActions';

const testState: IIssue[] = [];
const testIssue: IIssue = {
  id: 123,
  name: 'test issue',
  priority: 'High',
};

describe('Test issuesReducer', () => {
  it('Add issue', () => {
    const expectedState = [...testState, testIssue];
    const newState = issuesReducer(testState, addIssue(testIssue));
    expect(newState).toStrictEqual(expect.arrayContaining(expectedState));
    expect(newState).toStrictEqual(expectedState);
  });
  it('Update issue', () => {
    const initialState = [...testState, testIssue];
    const changedIssue = {...testIssue, name: 'test issue upd'};
    const expectedState = [...testState, changedIssue];
    const newState = issuesReducer(initialState, updateIssue(changedIssue));
    expect(newState).toStrictEqual(expect.arrayContaining(expectedState));
    expect(newState).toStrictEqual(expectedState);
  });
  it(`Remove issue`, () => {
    const initialState = [...testState, testIssue];
    const expectedState = [...testState];
    const newState = issuesReducer(initialState, removeIssue(testIssue.id));
    expect(newState).toStrictEqual(expect.arrayContaining(expectedState));
    expect(newState).toStrictEqual(expectedState);

  });
});

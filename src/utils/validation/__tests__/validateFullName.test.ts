import validateFullName from '../validateFullName';

describe('Lobby id validation (validateLobbyId)', () => {
  it('Get message about empty string', () => {
    const message = validateFullName('');
    expect(message).not.toBe('');
  });
  it('Get message about wrong characters', () => {
    const message = validateFullName('abc!');
    expect(message).not.toBe('');
  });
  it('Get message about correct string', () => {
    const message = validateFullName(`Test name '-.`);
    expect(message).toBe('');
  });
});

import validateLobbyId from '../validateLobbyId';

describe('Lobby id validation (validateLobbyId)', () => {
  it('Get message about empty string', () => {
    const message = validateLobbyId('');
    expect(message).not.toBe('');
  });
  it('Get message about wrong characters', () => {
    const message1 = validateLobbyId('abc!');
    const message2 = validateLobbyId('абв');
    expect(message1).not.toBe('');
    expect(message2).not.toBe('');
  });
  it('Get message about correct string', () => {
    const message = validateLobbyId('abc123_-');
    expect(message).toBe('');
  });
});

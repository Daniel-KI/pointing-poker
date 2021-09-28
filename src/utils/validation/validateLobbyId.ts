const validateLobbyId = (url: string): string => {
  const isNotEmpty = url.trim().length !== 0;
  const isOnlyValidCharacters = url.match('^[a-zA-Z0-9]+$');
  if (!isNotEmpty) return 'ID cannot be empty';
  if (!isOnlyValidCharacters) return 'ID can consist only numbers and latin letters';
  return '';
};

export default validateLobbyId;

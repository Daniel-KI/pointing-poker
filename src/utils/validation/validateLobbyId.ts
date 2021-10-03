import emptyStringValidation from './emptyStringValidation';

const validateLobbyId = (url: string): string => {
  const isNotEmpty = emptyStringValidation(url);
  const isOnlyValidCharacters = url.match(/^[a-zA-Z0-9\-_]+$/);
  if (!isNotEmpty) return 'This field cannot be empty';
  if (!isOnlyValidCharacters) return 'ID can consist only numbers, latin letters, dash and underscore';
  return '';
};

export default validateLobbyId;

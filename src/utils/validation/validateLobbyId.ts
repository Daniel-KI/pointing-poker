import emptyStringValidation from './emptyStringValidation';

const validateLobbyId = (url: string): string => {
  const isNotEmpty = emptyStringValidation(url);
  const isOnlyValidCharacters = url.match('^[a-zA-Z0-9]+$');
  if (!isNotEmpty) return 'This field cannot be empty';
  if (!isOnlyValidCharacters) return 'ID can consist only numbers and latin letters';
  return '';
};

export default validateLobbyId;

import emptyStringValidation from './emptyStringValidation';

const validateFullName = (fullname: string): string => {
  const isNotEmpty = emptyStringValidation(fullname);
  const isOnlyLettersAndSomeSumbols = fullname.match(/^\p{L}+[\p{L} .'-]*$/gu);
  if (!isNotEmpty) return 'This field cannot be empty';
  if (!isOnlyLettersAndSomeSumbols) return 'This field can consist only letters spaces, dots, dashes and single quotes';
  return '';
};

export default validateFullName;

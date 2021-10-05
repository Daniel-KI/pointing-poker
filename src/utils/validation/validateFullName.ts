import emptyStringValidation from './emptyStringValidation';

const validateFullName = (fullname: string): string => {
  const isEmpty = emptyStringValidation(fullname);
  const isOnlyLettersAndSomeSumbols = fullname.match(/^\p{L}+[\p{L} .'-]*$/gu);
  if (isEmpty) return 'This field cannot be empty';
  if (!isOnlyLettersAndSomeSumbols) return 'This field can consist only letters spaces, dots, dashes and single quotes';
  return '';
};

export default validateFullName;

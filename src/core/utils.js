export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const usernameValidator = name => {
  if (!name || name.length <= 0) return 'Username cannot be empty.';

  return '';
};

export const worknoValidator = workno => {
  if (!workno || workno.length != 8) return 'Workno should be EXACTLY 8 digits.';

  return '';
};

export const containernoValidator = containerno => {
  if (!containerno || containerno.length != 3) return 'Containerno should be EXACTLY 3 digits.';

  return '';
};

export const containerWeightValidator = weight => {
  if (!weight || weight.length <= 0) return 'Weight cannot be empty';

  return '';
};

export const procedureValidator = procedure => {
  if (procedure <= 0) return 'procedure cannot be empty';

  return '';
};
const isEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const hasUpperCase = (value: string) => {
  const pattern = new RegExp(/[A-Z]+(?:\s+[A-Z]+)*/);
  return pattern.test(value);
};

const hasWhiteSpace = (value: string) => {
  return !/^\S*$/.test(value);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkWhitespaces = async (rule: any, value: string) => {
  if (hasWhiteSpace(value)) {
    return Promise.reject("Please remove whitespace!");
  }

  return Promise.resolve();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateEmail = async (rule: any, value: string) => {
  if (!isEmail(value) || hasUpperCase(value)) {
    return Promise.reject("Please enter valid Email!");
  }

  return Promise.resolve();
};

export { checkWhitespaces, validateEmail };

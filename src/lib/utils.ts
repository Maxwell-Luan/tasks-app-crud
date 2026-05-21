const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const checkInvalidEmail = (email: string) => !EMAIL_REGEX.test(email);

export const checkInvalidPassword = (password: string) => password.length < 6; 
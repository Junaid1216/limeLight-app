export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const employeeIdRegex = /^[A-Za-z0-9]+$/;

export const numericCodeRegex = /^\d+$/;

export const isValidLogin = value =>
  emailRegex.test(value) || employeeIdRegex.test(value);

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+={}\[\]:;"'<>,.~`|\\/-]).{8,}$/;

export const nameRegex = /^[A-Za-z\s]+$/;


export const otpRegex = /^\d{6}$/;

export const specialCharRegex = /[@$!%*?&#^()_+={}\[\]:;"'<>,.~`|\\/-]/;

export const lowercase = /[a-z]/;

export const uppercase = /[A-Z]/;

export const digitRegex = /[0-9]/;

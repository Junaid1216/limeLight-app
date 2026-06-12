export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+={}\[\]:;"'<>,.~`|\\/-]).{8,}$/;

export const nameRegex = /^[A-Za-z\s]+$/;


export const otpRegex = /^\d{6}$/;

export const specialCharRegex = /[@$!%*?&#^()_+={}\[\]:;"'<>,.~`|\\/-]/;

export const lowercase = /[a-z]/;

export const uppercase = /[A-Z]/;

export const digitRegex = /[0-9]/;

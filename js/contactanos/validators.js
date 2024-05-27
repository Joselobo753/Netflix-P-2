import { trimInterno, validInput, invalidInput } from "../utils.js";

export const validateNombre = ($input) => {
  if (!$input || !$input.value.trim()) {
    invalidInput($input);
    return false;
  }

  if ($input.value.trim().length < 3 || $input.value.trim().length > 50) {
    invalidInput($input);
    return false;
  }

  const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ\s]+$/;
  if (!regex.test($input.value)) {
    invalidInput($input);
    return false;
  }

  validInput($input);
  return true;
};

export const validateEmail = ($input) => {
  if (!$input || !$input.value.trim()) {
    invalidInput($input);
    return false;
  }

  if ($input.value.trim().length < 3 || $input.value.trim().length > 100) {
    invalidInput($input);
    return false;
  }

  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regex.test($input.value)) {
    invalidInput($input);
    return false;
  }

  validInput($input);
  return true;
};

export const validateMsg = ($input) => {
  if (!$input || !$input.value.trim()) {
    invalidInput($input);
    return false;
  }

  if (
    $input.value.trim().length < 100 ||
    $input.value.trim().length > 2000 ||
    trimInterno($input.value).trim().length < 100
  ) {
    invalidInput($input);
    return false;
  }

  const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ0-9.,@()\-\s]+$/;
  if (!regex.test($input.value)) {
    invalidInput($input);
    return false;
  }

  validInput($input);
  return true;
};

import { trimInterno, validInput, invalidInput } from "./utils.js";

export const validateTexto = ($field) => {
  if (!$field || !$field.value.trim()) {
    invalidInput($field);
    return false;
  }

  if ($field.value.trim().length < 3 || $field.value.trim().length > 400) {
    invalidInput($field);
    return false;
  }

  const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ\s]+$/;
  if (!regex.test($field.value)) {
    invalidInput($field);
    return false;
  }

  validInput($field);
  return true;
};

export const validateUrl = ($field) => {
  if (!$field || !$field.value.trim()) {
    invalidInput($field);
    return false;
  }

  if ($field.value.trim().length < 3) {
    invalidInput($field);
    return false;
  }

  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  if (!regex.test($field.value)) {
    invalidInput($field);
    return false;
  }

  validInput($field);
  return true;
};

export const validateImg = ($field) => {
  if (!$field || !$field.value.trim()) {
    invalidInput($field);
    return false;
  }

  const regex =
    /https?:\/\/(?:www\.)?[-\w@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-\w@:%_\+.~#?&//=]*)\.(?:jpg|jpeg|png|gif|bmp)/;
  if (!regex.test($field.value)) {
    invalidInput($field);
    return false;
  }

  if ($field.value.trim().length < 3) {
    invalidInput($field);
    return false;
  }

  validInput($field);
  return true;
};

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

export const validatePss = ($input) => {
  if (!$input || !$input.value.trim()) {
    invalidInput($input);
    return false;
  }

  if ($input.value.trim().length < 8 || $input.value.trim().length > 100) {
    invalidInput($input);
    return false;
  }

  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@.,;]).{8,}$/;
  if (!regex.test($input.value)) {
    invalidInput($input);
    return false;
  }

  validInput($input);
  return true;
};

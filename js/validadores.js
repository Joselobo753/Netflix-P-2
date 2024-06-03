import { trimInterno, validInput, invalidInput } from "./utils.js";

export const validateTexto = ($field) => {
  if (!$field || !$field.value.trim()) {
    $field.classList.add("is-invalid");
    $field.classList.remove("is-valid");
    return false;
  }

  const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ\s]+$/;
  if (!regex.test($field.value)) {
    $field.classList.add("is-invalid");
    $field.classList.remove("is-valid");
    return false;
  }

  $field.classList.remove("is-invalid");
  $field.classList.add("is-valid");
  return true;
};

export const validateUrl = ($field) => {
  if (!$field || !$field.value.trim()) {
    $field.classList.add("is-invalid");
    $field.classList.remove("is-valid");
    return false;
  }

  if ($field.value.trim().length < 3) {
    $field.classList.add("is-invalid");
    $field.classList.remove("is-valid");
    return false;
  }
};

export const validateImg = ($field) => {
  const regex =
    /https?:\/\/(?:www\.)?[-\w@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-\w@:%_\+.~#?&//=]*)\.(?:jpg|jpeg|png|gif|bmp)/;
  if (!$field || !$field.value.trim()) {
    $field.classList.add("is-invalid");
    $field.classList.remove("is-valid");
    return false;
  }

  if (!regex.test($field.value)) {
    $field.classList.add("is-invalid");
    $field.classList.remove("is-valid");
    return false;
  }

  if ($field.value.trim().length < 3) {
    $field.classList.add("is-invalid");
    $field.classList.remove("is-valid");
    return false;
  }
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

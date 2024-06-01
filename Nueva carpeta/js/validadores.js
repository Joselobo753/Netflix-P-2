export const validateTexto = ($field) => {
    
    if (!$field || !$field.value.trim()) {
      $field.classList.add('is-invalid');
      $field.classList.remove('is-valid');
      return false;
    }
  

    const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ\s]+$/;
    if (!regex.test($field.value)) {
      $field.classList.add('is-invalid');
      $field.classList.remove('is-valid');
      return false;
    }
  
    $field.classList.remove('is-invalid');
    $field.classList.add('is-valid');
    return true;
  };
  export const validateUrl = ($field) => {

    if (!$field || !$field.value.trim()) {
      $field.classList.add('is-invalid');
      $field.classList.remove('is-valid');
      return false;
    }
  
   
    if ($field.value.trim().length < 3) {
      $field.classList.add('is-invalid');
      $field.classList.remove('is-valid');
      return false;
    }
    }
    export const validateImg = ($field) => {
        const regex = /https?:\/\/(?:www\.)?[-\w@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-\w@:%_\+.~#?&//=]*)\.(?:jpg|jpeg|png|gif|bmp)/;
        if (!$field || !$field.value.trim()) {
          $field.classList.add('is-invalid');
          $field.classList.remove('is-valid');
          return false;
        }
      
        if (!regex.test($field.value)) {
            $field.classList.add('is-invalid');
            $field.classList.remove('is-valid');
            return false;
          }
       
        if ($field.value.trim().length < 3) {
          $field.classList.add('is-invalid');
          $field.classList.remove('is-valid');
          return false;
        }}
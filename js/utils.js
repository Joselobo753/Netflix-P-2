export const trimInterno = (texto) => {
  return texto.replace(/\s+/g, " ");

  
};
export const validInput = ($input) => {
  $input.classList.remove("is-invalid");
  $input.classList.add("is-valid");
};

export const invalidInput = ($input) => {
  $input.classList.add("is-invalid");
  $input.classList.remove("is-valid");
};

export const resetInput = ($input) => {
  $input.classList.remove("is-invalid");
  $input.classList.remove("is-valid");
};

export const obtenerDeLS = (nombreObjeto) => {
  return JSON.parse(localStorage.getItem(nombreObjeto)) || [];
};

export const agregarALS = (objetoAgregar, nombreGuardado) => {
  const lista = obtenerDeLS(nombreGuardado);

  lista.push(objetoAgregar);

  localStorage.setItem(nombreGuardado, JSON.stringify(lista));
};

export const enviarMail = (titulo, msg) => {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "proyectocopianetflix@gmail.com",
    Password: "979CAC3ACAD24262732D1DEEC1F0FD1C0952",
    To: "proyectocopianetflix@gmail.com",
    From: "proyectocopianetflix@gmail.com",
    Subject: titulo,
    Body: msg,
  });
};

export const obtenerPeliculasDeLS = () => {
  return ordenarLista(JSON.parse(localStorage.getItem("peliculas")) || []);
};

export const estaLogueado = () => {
  return sessionStorage.getItem("estaLogueado");
};

export const ordenarLista = (lista) => {
  return lista.sort((a, b) => {
    if (a.nombre > b.nombre) {
      return 1;
    }
    if (a.nombre < b.nombre) {
      return -1;
    }
    return 0;
  });
};

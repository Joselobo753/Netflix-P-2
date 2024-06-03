export const trimInterno = (texto) => {
  return texto.replace(/\s+/g, " ");

  /*
  Busca cualquier ocurrencia de \s que es un espacio y en cualquier cantidad, y reemplaza esa cantidad x por un solo espacio
  \s es el espacio
  + indica mas de una ocurrencia del espacio por lo que busca conjunto de espacios
  / indica el fin de la expresion
  g es global, es decir que busca en toda la cadena conjunto de espacio y no se queda en la primera coincidencia
  */
};
export const validInput = ($input) => {
  $input.classList.remove("is-invalid");
  $input.classList.add("is-valid");
};

export const invalidInput = ($input) => {
  $input.classList.add("is-invalid");
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

export const enviarMail = (titulo, msg, destinatario) => {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "proyectocopianetflix@gmail.com",
    Password: "979CAC3ACAD24262732D1DEEC1F0FD1C0952",
    To: "proyectocopianetflix@gmail.com",
    From: "proyectocopianetflix@gmail.com",
    Subject: titulo,
    Body: msg,
  }).then((message) => alert(message));
};

export const obtenerPeliculasDeLS = () => {
  const peliculasJSON = localStorage.getItem("pelicula");

  if (!peliculasJSON) {
    return [];
  }

  const peliculas = JSON.parse(peliculasJSON);

  return ordenarLista(peliculas);
};

export const estaLogueado = () => {};

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

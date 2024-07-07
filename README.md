# ObraSocial-React-Grupo6

## Descripción:

Proyecto Frontend realizado en React para la gestión de turnos médicos, visualización de especialistas y recetas médicas para una Obra Social.

Este proyecto se ha desarrollado para consumir [nuestra propia API]([NicoBrites/ObraSocial-Quarkus-Grupo6 (github.com)](https://github.com/NicoBrites/ObraSocial-Quarkus-Grupo6)) en en el Backend.

El grupo se haya conformado por:
- [Nicolas Brites](https://github.com/NicoBrites)
- [Federico Acosta](https://github.com/fede-acos)
- [David Bernhardt](https://github.com/DavidBernhardt)

Puede consultar nuestro prototipo de diseño empleado [aqui]().
## Funcionalidades

- **Autentificación y  autorización**: Brinda al usuario una pagina de inicio desde la cual acceder al sistema con sus credenciales.
- **Creación de usuario**: Pantalla de registro donde el usuario podrá registrarse al sistema.
- **Cartilla de Especialistas**: Ofrece una vista de los especialistas con sus horarios, ubicación y áreas de especialización.
- **Gestión de Turnos**: Permite crear, leer, listar y eliminar turnos médicos. El usuario luego de seleccionar un especialista, podra elegir entre los dias y horarios disponibles del mismo.
- **Descarga de recetas**: Los usuarios autorizados pueden acceder a sus recetas medicas a traves del turno asociado.
- **Diseño responsive:** Todas las vistas se adaptan a la pantalla del usuario.
- **Modo oscuro:** Modo oscuro implementado globalmente para todas las vistas.
- **Diseño moderno:** Interfaz diseñada con tendencias actuales, implementando la libreria [**NextUI**:]([NextUI - Beautiful, fast and modern React UI Library](https://nextui.org/))

## Dependencias:

- [**@nextui-org/react**:]([NextUI - Beautiful, fast and modern React UI Library](https://nextui.org/)) Libreria grafica de componentes.
- [**@tanstack/react-query**:]([Empezando | Axios Docs (axios-http.com)](https://axios-http.com/es/docs/intro)) Administrador asíncrono de estados
- [**axios**:]([Empezando | Axios Docs (axios-http.com)](https://axios-http.com/es/docs/intro)) Para hacer solicitudes HTTP.
- [**framer-motion**]([Documentation | Framer for Developers](https://www.framer.com/motion/)): Usada para animaciones.
- **jwt-decode**: Decodificacion de tokens JWT.
- [**react**]([React](https://es.react.dev/)): Libreria para interfaces de usuario web y nativas
- [**react-hook-form**]([Home | React Hook Form - Simple React forms validation (react-hook-form.com)](https://www.react-hook-form.com/)): Para validacion y manejo de forms.
- [**react-ionicons**]([Ionicons: Premium Open Source Icon Pack for Ionic Framework](https://ionic.io/ionicons)): Libreria de iconos para react.
- [**react-router-dom**]([Home v6.24.1 | React Router](https://reactrouter.com/en/main)): Para manejar el ruteo dentro de la aplicacion.
- [**react-toastify**]([Toastify JS - Pure JavaScript Toast Notificaton Library (apvarun.github.io)](https://apvarun.github.io/toastify-js/)): Provee notificaciones del tipo toast.
- [**sweetalert2**:]([SweetAlert2 - a beautiful, responsive, customizable and accessible (WAI-ARIA) replacement for JavaScript's popup boxes](https://sweetalert2.github.io/)) Alertas customizables en forma de ventanas modales.
- [**typescript**:]([TypeScript: JavaScript With Syntax For Types. (typescriptlang.org)](https://www.typescriptlang.org/)) Compilador del lenguaje Typescript
- [**usehooks-ts**:]([usehooks-ts](https://usehooks-ts.com/)) Utilizamos uno de sus hooks para implementar modo oscuro global.
- **@vitejs/plugin-react**: Plugin de Vite para React.
- [**tailwindcss**:]([Tailwind CSS - Rapidly build modern websites without ever leaving your HTML.](https://tailwindcss.com/)) Framework de CSS.
- [**vite**]([Vite | Next Generation Frontend Tooling (vitejs.dev)](https://vitejs.dev/)): Servidor de desarrollo local.

## Instalacion y ejecucion:

1. Clonar el repositorio.
2. Instalar [npm]([Downloading and installing Node.js and npm | npm Docs (npmjs.com)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)) en caso de no tenerlo.
3. Desde el directorio del repositorio, correr el comando `npm install` para instalar dependencias.
4. Iniciar el servidor de desarrollo con `npm run dev`.
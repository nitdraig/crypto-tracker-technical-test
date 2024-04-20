# Crypto Tracker | Prueba técnica Fullstack Developer - Zergex

## Aclaraciones:
+ Busqué crear una arquitectura similar en back y front.
+ Para poder iniciar ambas partes se debe tener instalado Node.js y PostgreSQL.
+ Use React+Vite, implementando una arquitectura de carpetas basado en un dividir la app en secciones claras y los componentes grandes en pequeños componentes cuya configuración esta hecha con Typescript, usé StyledComponents para los estilos. Traté no usar liberías externas que podría haber hecho una interfaz más trabajada y llamativa, prioricé la semántica y el desarrollo de los componentes de forma responsive.
+ Dado que es un proyecto simple y sin posibilidades de filtración, decidí obviar la creación de dotenv. Cosa que por buenas prácticas no haría.
+ Personalmente haría mejoras del apartado gráfico, a nivel técnico lo siento bastante robusto, seguramente habrá alguna mejora o sugerencia.

## Pasos para ejecución
+ Descargar el repositorio completo
+ Instalar dependencias tanto de back, como de front.
+ Crear una base de datos con alguna interfaz de administración de bases de datos, personalmente usé: "DBeaver". El nombre de la base debe ser: "postgres" | Con su respectiva contraseña: "password" | Sin comillas.
+ Para iniciar el back-end, desde la terminar escribir "npm run dev", sin comillas.
+ Para iniciar el front-end, desde la terminar escribir "npm run dev", sin comillas.
+ Abrir el navegador de preferencia, en la siguiente url: http://localhost:5173/
+ Elegir "Registrarse", allí crearás tu cuenta con la que podrás iniciar sesión, y permitiendote acceder al CRUD del Tracker.
+ No se puede acceder al Dashboard, área donde se hacer el crud, sin iniciar sesión.


*Link de tests de pruebas manuales en postman: https://www.postman.com/payload-astronomer-22029507/workspace/cryptotracker/collection/30265373-62102ce9-e988-4845-a722-a3dca8052b9f
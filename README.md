### Prueba Técnica para Desarrollador Fullstack Senior

## Ejecucion del proyecto
para la ejecutar el proyecto en local, lo primero que se debe ahcer es configurar als variables de entorno, para esto debemos crear un arhivo que se llame .env, aqui debemos asignar las siguientes variables

# .env

DATABASE_URL: url database en supabase
DIRECT_URL: direct url database en supabase
NEXTAUTH_URL: "http://localhost:3000"
NEXTAUTH_SECRET: palabra clave para NEXTAUTH, es cualquier palabra
AUTH0_SECRET: variable que sacas de la configuracion de tu aplicacion de auth0
AUTH0_BASE_URL: "http://localhost:3000"
AUTH0_ISSUER_BASE_URL: variable que sacas de la configuracion de tu aplicacion de auth0
AUTH0_CLIENT_ID: variable que sacas de la configuracion de tu aplicacion de auth0
AUTH0_CLIENT_SECRET: variable que sacas de la configuracion de tu aplicacion de auth0
SECRET_KEY: palabra clave para JWT, es cualquier palabra

Despues se debe ejecutar el comando npm i , para instalar las libreria y dependencias.

Ejecutamos npm run dev para ejecutar el proyecto en ambiente de desarrollo y ya esta en ejecucion el proyecto en http://localhost:3000

## Despliegue en vercel

De la forma que este proyecto se desplego en vercel fue hacer la integracion de la cuenta de github en vercel y de forma automatica vercel reconoce los repositorios de github, se selecciono el proyecto, se configuraron las variables de entorno y ya quedo desplegado
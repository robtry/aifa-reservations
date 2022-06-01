# Airport Reservation

AIFA is going to open operations on March 21, in order to operate need to have a system to schedule the gates of the airport.

## Pasos para correr el proyecto en local

1. Instalar dependencias

```sh
# Set up front
yarn install
yarn start
firebase init # instalar database, authentication, firestore

# Set up back
cd functions/
yarn install
yarn build

# Run simultors
firebase emulators:start --import=bk --export-on-exit=bk
```
2. Ejecutar los seeders (post a `/seed`)
3. Crear usuarios
4. Agregar en firestore los roles con su respectivo id
5. Ejecutar front

## Endpoints

- `/seed` : Llenar la base de datos;
- `/reserve`: Para las aereolineas (airline, date, date)
- ``


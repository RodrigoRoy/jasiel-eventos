# Proyecto de administración de eventos

Proyecto para organizar la distribución de personas en eventos al interior de un salón. Se tiene un sistema de usuarios, formularios de captura de la información, visualización del espacio y permite generar boletos con código QR.

## Requisitos de Instalación

- [NodeJS](https://nodejs.org) (version LTS)
- [MongoDB](https://www.mongodb.org/) (Community Server)

## Instalar dependencias
```
npm install
```

## Crear archivo "config.js" en directorio raíz con el siguiente contenido y cambiar los nombres de la base de datos y la frase secreta para usar en la creación de tokens:
```
module.exports = {
  dbname_dev: 'nombre-basedatos-desarrollo',
  dbname_prod: 'nombre-basedatos-produccion',
  token_dev: 'frase-secreta-desarrollo',
  token_prod: 'frase-secreta-produccion',
};
```
### Compilar y minificar para producción
```
npm run build
```

### Compilar proyecto y ejecutar ambiente de desarrollo
```
npm run dev
```

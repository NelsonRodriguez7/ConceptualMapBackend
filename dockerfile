# Usa una imagen oficial de Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto (usa el de tu .env local)
EXPOSE 3000

# Comando por defecto para ejecutar la app
CMD ["npm", "run", "dev"]

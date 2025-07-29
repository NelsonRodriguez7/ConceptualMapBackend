# 📚 Conceptual Map Backend

### Versión: 1.0.0

Backend en Node.js con Express, MongoDB Atlas y JWT. Este servicio permite a los usuarios autenticarse, subir archivos PDF, y generar mapas conceptuales a través de inteligencia artificial (OpenAI).

---

## 🚀 Instalación y uso local

1. Clona este repositorio:

```bash
git clone https://github.com/NelsonRodriguez7/ConceptualMapBackend.git
cd conceptualmap-backend
```

2. Crear un archivo .env en al raiz del proyecto con:
```bash
OPENAI_API_KEY="TuApiKey"
PORT=3000
MONGODB="TuMongoDBAtlas"
JWT_SECRET="LoQueQuierasColocarAqui"
```

3. Ejecuta con Docker:
```bash
docker-compose up --build
```

## 🌐 Endpoints
🧑‍💼 Auth
| Método | Ruta                 | Descripción               | Status Codes        |
| ------ | -------------------- | ------------------------- | ------------------- |
| POST   | `/api/auth/register` | Registro de usuario nuevo | `API0000`, `API4001`, `API4004` |
| POST   | `/api/auth/login`    | Login de usuario          | `API0000`,`API4001`, `API4004`        |


📁 Archivos
| Método | Ruta          | Descripción                         | Status Codes        |
| ------ | ------------- | ----------------------------------- | ------------------- |
| POST   | `/api/upload` | Subir PDF y generar mapa conceptual | `API0000`, `API4001`, `API4004` |

⚠️ /api/upload requiere token JWT en los headers:
Authorization: Bearer <token>

## 🔒 Middleware y seguridad
- Contraseñas hasheadas con bcrypt

- Tokens JWT para proteger rutas

- Middleware para verificación de sesión activa

## 🧩 Variables de entorno


.env
```bash
PORT=3000
MONGODB=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=tu_clave_jwt_super_secreta
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
```

## 🐳 Docker
Este proyecto ya está preparado para contenedores con Docker.

dockerfile
```bash
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

```

docker-compose.yml
```bash
version: "3.8"

services:
  backend:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    restart: unless-stopped

```

## ✨ Funcionalidades principales
- Registro y login de usuarios

- Validación de sesión con JWT

- Subida de PDF y análisis de contenido

- Generación de mapas conceptuales usando OpenAI

## 📁Estructura del proyecto (resumida)
```
├── controllers/
├── routes/
├── services/
├── middleware/
├── models/
├── index.js
├── Dockerfile
├── docker-compose.yml
├── .env
└── README.md

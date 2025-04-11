# 🛒 Tienda Carlos Fernández

Sistema completo de tienda en línea con roles de cliente y administrador. Incluye funcionalidades como:

- Visualización de productos con filtros por precio, categoría y fecha
- Carrito de compras con confirmación
- Registro y login de usuarios
- Administración de productos (CRUD + imágenes)
- Visualización de historial de compras (solo admin)

---

## 📦 Tecnologías utilizadas

### Frontend
- React + Vite
- CSS personalizado

### Backend
- Node.js + Express
- PostgreSQL (mediante `pg`)
- Multer (subida de imágenes)
- CORS

---

## 🧰 Estructura del proyecto

```
/client            # Proyecto React (frontend)
  ├── components   # Todos los componentes de UI
  └── api.js       # Conexión a backend

/server            # Proyecto Node (backend)
  ├── routes       # Rutas Express (productos, usuarios, compras)
  ├── db.js        # Configuración de conexión a PostgreSQL
  └── uploads      # Imágenes de productos

/public            # Archivos estáticos
```

---

## 🚀 Instrucciones de uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/carlosfernandezdev/tienda-carlos.git
cd tienda-carlos
```

### 2. Backend
```bash
cd server
npm install
npm run dev  
```

Asegúrate de que tienes PostgreSQL corriendo con una base de datos y tablas creadas. Ejemplo:

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  usuario VARCHAR(50),
  contrasena VARCHAR(100),
  rol VARCHAR(10) DEFAULT 'cliente'
);

CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre TEXT,
  categoria TEXT,
  precio NUMERIC,
  proveedor TEXT,
  stock INTEGER,
  fecha DATE,
  imagen TEXT
);

CREATE TABLE compras (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  total NUMERIC,
  fecha TIMESTAMP DEFAULT NOW()
);

CREATE TABLE detalle_compra (
  id SERIAL PRIMARY KEY,
  compra_id INTEGER REFERENCES compras(id),
  producto_id INTEGER REFERENCES productos(id),
  cantidad INTEGER,
  precio_unitario NUMERIC
);
```

---

### 3. Frontend
```bash
cd client
npm install
npm run dev
```

---

## 🔐 Acceso

### Clientes:
- Registro desde la interfaz
- Vista de productos, filtros, carrito, y confirmación de compra

### Admin:
- Usuario creado manualmente en base de datos
```sql
INSERT INTO usuarios (usuario, contrasena, rol) VALUES ('admin', '1234', 'admin');
```

---

## 🖼️ Subida de imágenes
Las imágenes se suben a `/uploads` y se sirven desde el backend en la ruta `/uploads/<nombre_archivo>`.

---

## 📑 Funcionalidades principales

- ✔️ Filtros por categoría, precio y fecha
- ✔️ Carrito persistente
- ✔️ Login y control de sesión
- ✔️ Panel administrativo completo:
  - Crear producto con imagen
  - Editar producto con imagen opcional
  - Eliminar producto
  - Ver lista de compras
- ✔️ Vista de gracias tras comprar

---

## ✍️ Autor

**Carlos Fernández**  
Proyecto académico desarrollado para Manejo de Frameworks.

---

## 🧾 Licencia

Este proyecto es mio, no plagiar (guiño guiño).


## ✅ ¿Qué hace tu código?

1. **Define un usuario simulado** con contraseña encriptada usando `bcrypt`.
2. Expone una ruta `/login` para verificar credenciales y generar un **token JWT**.
3. Expone una ruta `/tokenok` que:

   * Requiere un token por el header `Authorization: Bearer <token>`.
   * Verifica su validez y devuelve el payload si es correcto.

---

## 🧠 Detalles clave del funcionamiento

### 🔐 Login y generación del token

```ts
const usuario = Users.find(u => u.nombre === nombre);
```

Busca un usuario por su `nombre`.

```ts
const valido = await bcrypt.compare(password, usuario.password);
```

Compara la contraseña ingresada con la almacenada en hash (segura).

```ts
res.json(generar_token({id:usuario.id, nombre:usuario.nombre}));
```

Si es válida, genera un token con 1 hora de expiración y lo devuelve.

---

### 🛡 Verificación de token

```ts
const authHeader = req.headers.authorization;
const token = authHeader && authHeader.split(' ')[1];
```

Extrae el token del header `Authorization`.

```ts
const token_data = verificarToken(token);
```

Verifica que el token sea válido y no esté vencido.

---



### 📦 Opcional: Reemplazar `Users` por base de datos

Actualmente usas un arreglo estático. Para escalar es fundamental utilizar na base de datos un ORM como Prisma.

### 🛡️ Consejo interactuar con el token JWT en rutas protegidas (como `GET /tokenok`)

Cuando trabajes con rutas protegidas que requieren autenticación por **JWT**, como `GET /tokenok`, debes asegurarte de enviar el token correctamente en cada solicitud. El token JWT **nunca debe enviarse en el cuerpo o como parámetro en la URL**, sino en el encabezado HTTP `Authorization` con el siguiente formato:

```http
Authorization: Bearer <tu_token_aquí>
```

---

### 🧪 Con `curl`

Una vez que hayas obtenido el token tras hacer login, puedes probar una ruta protegida como esta:

```bash
curl -X GET http://localhost:3000/tokenok \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

⚠️ Asegúrate de reemplazar el token por el real que te devuelve el login.

---

### 🧪 Con Postman

1. En la pestaña **Headers**, agrega:

   * **Key:** `Authorization`
   * **Value:** `Bearer <tu_token>`

2. Asegúrate de que no haya espacios extra y que el token esté completo.

---

✅ **Consejo práctico**: Guarda el token en una variable de entorno o en una colección de Postman para reutilizarlo fácilmente y evitar copiar/pegar en cada solicitud.

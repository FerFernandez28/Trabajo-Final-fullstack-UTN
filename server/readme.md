
## Endpoints de users

- `POST /api/register`: Registra a un nuevo usuario.
- `POST /api/login`: Inicia sesión para un usuario existente.
- `POST /api/logout`: Cierra la sesión del usuario.
- `GET /api/verify`: Verifica la autenticidad del usuario basándose en el token.
- `GET /api/profile`: Obtiene el perfil del usuario autenticado.

## Endpoints de products

- `GET /api/products/`: Obtiene todos los productos.
- `GET /api/products/:pid`: Obtiene un solo producto.
- `POST /api/products/`: Crea un producto.
- `DELETE /api/products/:pid`: Elimina un producto.
- `PUT /api/products/:pid`: Actualiza un producto.

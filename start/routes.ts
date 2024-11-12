/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/roles', 'RolesController.agregar')
Route.get('/roles', 'RolesController.mostrar')

Route.post('/usuarios/agregar', 'UsuariosController.agregar')
Route.get('/usuarios/:id?', 'UsuariosController.mostrar')
Route.put('/usuarios/modificar/:id', 'UsuariosController.modificar')
Route.delete('/usuarios/eliminar/:id', 'UsuariosController.eliminar')

Route.post('/login', 'LoginController.login')


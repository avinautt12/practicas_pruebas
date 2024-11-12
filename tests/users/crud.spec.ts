import { test } from '@japa/runner'

test.group('Crud', () => {
  test('crear usuarios y verificar la cantidad total de usuarios', async ({ client, assert }) => {
    await client.post('/usuarios/agregar').json({
      nombre: 'usuario1',
      apellidos: 'apellido1',
      edad: '25',
      contrasena: 'usuario123',
      rol_id: 2,
    })

    await client.post('/usuarios/agregar').json({
      nombre: 'usuario2',
      apellidos: 'apellido2',
      edad: '30',
      contrasena: 'usuario456',
      rol_id: 2,
    })

    const response = await client.get('/usuarios')
    response.assertStatus(200)

    const usuarios = response.body().data
    assert.equal(usuarios.length, 12, `Se esperaba que la cantidad de usuarios fuera 12, pero se encontró ${usuarios.length}`)
  })

  test('eliminar 2 usuarios y verificar que la cantidad total sea 10', async ({ client, assert }) => {
    await client.delete('/usuarios/eliminar/11')
    await client.delete('/usuarios/eliminar/12')

    const response = await client.get('/usuarios')
    response.assertStatus(200)

    const usuarios = response.body().data
    assert.equal(usuarios.length, 10, `Se esperaba que la cantidad de usuarios fuera 10, pero se encontró ${usuarios.length}`)
  })

  test('actualizar los datos del usuario 1', async ({ client, assert }) => {
    const usuarioId = 1
    const datosActualizados = {
      nombre: 'Farlos',
      apellidos: 'Pérez Rodríguez',
      edad: '20',
      contrasena: 'contraseña123',  
      rol_id: 2,
    }

    const response = await client.put(`/usuarios/modificar/${usuarioId}`).json(datosActualizados)
    
    response.assertStatus(200)
    response.assertBodyContains({
      mensaje: 'Usuario actualizado exitosamente',
    })

    const usuarioActualizadoResponse = await client.get(`/usuarios/${usuarioId}`)
    usuarioActualizadoResponse.assertStatus(200)
    const usuarioActualizado = usuarioActualizadoResponse.body().data
    
    assert.equal(usuarioActualizado.nombre, 'Farlos')
    assert.equal(usuarioActualizado.apellidos, 'Pérez Rodríguez')
    assert.equal(usuarioActualizado.edad, '20')
    assert.equal(usuarioActualizado.contrasena, 'contraseña123')
    assert.equal(usuarioActualizado.rol_id, 2)
  })
})

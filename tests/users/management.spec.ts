import { test } from '@japa/runner'

test.group('Management', () => {
  test('verificar que la cantidad de usuarios sea 11', async ({ client, assert }) => {
    await client.post('/usuarios/agregar').json({
      nombre: 'Calamardo',
      apellidos: 'Tentáculos',
      edad: '25',
      contrasena: 'Calamardo123',
      rol_id: 2,
    })

    const response = await client.get('/usuarios')
    response.assertStatus(200)

    const usuarios = response.body().data
    assert.equal(usuarios.length, 11, `Se esperaba 11 usuarios, pero se encontró ${usuarios.length}`)
  })

  test('login exitoso con credenciales correctas', async ({ client }) => {
    const response = await client.post('/login').json({
      nombre: 'David',  
      contrasena: 'contraseña123',
    })
  
    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      message: 'Login exitoso',
    })
  })
  
  test('login fallido con credenciales incorrectas', async ({ client }) => {

    const response = await client.post('/login').json({
      nombre: 'Carlos', 
      contrasena: 'incorrecta123',
    })
  
    response.assertStatus(401)
    response.assertBodyContains({
      success: false,
      message: 'Credenciales incorrectas',
    })
  })
}) 

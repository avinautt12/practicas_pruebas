import { test } from '@japa/runner'

test.group('Data', () => {

  test('info de usuario 7', async ({ client }) => {
    const response = await client.get('/usuarios/7')
    
    response.assertBodyContains({
      message: 'Usuario encontrado',
      data: {
        nombre: 'David',
      },
    })
    
    response.assertStatus(200)
  })
  
  test('verificar que un usuario con id 22 no existe', async ({ client }) => {
    const response = await client.get('/usuarios/22') 
  
    response.assertBody({
      mensaje: 'Usuario no encontrado',
    })
    response.assertStatus(404)
  })
  
  
  test('verificar que la cantidad de usuarios sea 11', async ({ client, assert }) => {
  
      const response = await client.get('/usuarios')
      response.assertStatus(200)
  
      const usuarios = response.body().data
      assert.equal(usuarios.length, 11, `Se esperaba 11 usuarios, pero se encontró ${usuarios.length}`)
  })
  
})


import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class AuthController {
  public async login({ request, response }: HttpContextContract) {
    const { nombre, contrasena } = request.only(['nombre', 'contrasena'])

    try {
      const usuario = await Usuario.query().where('nombre', nombre).first()

      if (!usuario) {
        return response.status(401).json({
          success: false,
          message: 'Credenciales incorrectas',
        })
      }

      if (usuario.contrasena !== contrasena) {
        return response.status(401).json({
          success: false,
          message: 'Credenciales incorrectas',
        })
      }

      return response.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: {
          usuario: usuario.nombre,
          id_usuario: usuario.id,
        },
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Error en el servidor',
        details: error.message,
      })
    }
  }
}

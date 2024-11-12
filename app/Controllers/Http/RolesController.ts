import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rol from 'App/Models/Rol'

export default class RolesController {
  public async agregar({ request, response }: HttpContextContract) {
    const nombre = request.input('nombre')

    const rol = await Rol.create({ nombre })

    return response.status(201).json({
      message: 'Rol creado exitosamente',
      data: rol,
    })
  }

    public async mostrar({ response }: HttpContextContract) {
        const roles = await Rol.all()
    
        return response.status(200).json({
        message: 'Roles',
        data: roles,
        })
    }
}


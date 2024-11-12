import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsuariosController {
    public async agregar({ request, response }: HttpContextContract) {
        const usuarioSchema = schema.create({
          nombre: schema.string.optional({}, [rules.maxLength(100), rules.unique({ table: 'usuarios', column: 'nombre' })]),
          apellidos: schema.string.optional({}, [rules.maxLength(100)]),
          edad: schema.string.optional({}, [rules.maxLength(2)]),
          contrasena: schema.string({}, [rules.maxLength(255)]),
          rol_id: schema.number.optional([rules.exists({ table: 'roles', column: 'id' })]),
        })
  
        const datosValidados = await request.validate({
          schema: usuarioSchema,
          messages: {
            'nombre.maxLength': 'El nombre ya está en uso. Por favor, elige otro.',
            'apellidos.maxLength': 'Los apellidos no deben exceder los 100 caracteres.',
            'edad.maxLength': 'La edad no debe exceder los 2 caracteres.',
            'contrasena.maxLength': 'La contraseña no debe exceder los 255 caracteres.',
            'rol_id.exists': 'El rol seleccionado no existe.',
          },
        })
  
        const usuario = await Usuario.create(datosValidados)
  
        return response.status(201).json({
          mensaje: 'Usuario creado exitosamente',
          data: usuario,
        })
    }
    

    public async mostrar({ params, response }: HttpContextContract) {
        try {
          if (params.id) {
            const usuario = await Usuario.find(params.id)
    
            if (!usuario) {
              return response.status(404).json({
                mensaje: 'Usuario no encontrado',
              })
            }
    
            return response.status(200).json({
              message: 'Usuario encontrado',
              data: usuario,
            })
          }
    
          const usuarios = await Usuario.all()
    
          return response.status(200).json({
            message: 'Usuarios',
            data: usuarios,
          })
        } catch (error) {
          return response.status(500).json({
            mensaje: 'Error al obtener los usuarios',
            detalles: error.message,
          })
        }
      }

      public async modificar({ params, request, response }: HttpContextContract) {
        try {
          // Validamos los datos enviados
          const usuarioSchema = schema.create({
            nombre: schema.string.optional({}, [rules.maxLength(100), rules.unique({ table: 'usuarios', column: 'nombre', whereNot: { id: params.id } })]),
            apellidos: schema.string.optional({}, [rules.maxLength(100)]),
            edad: schema.string.optional({}, [rules.maxLength(2)]),
            contrasena: schema.string.optional({}, [rules.maxLength(255)]),
            rol_id: schema.number.optional([rules.exists({ table: 'roles', column: 'id' })]),
          })
    
          const datosValidados = await request.validate({
            schema: usuarioSchema,
            messages: {
              'nombre.maxLength': 'El nombre no debe exceder los 100 caracteres.',
              'apellidos.maxLength': 'Los apellidos no deben exceder los 100 caracteres.',
              'edad.maxLength': 'La edad no debe exceder los 2 caracteres.',
              'contrasena.maxLength': 'La contraseña no debe exceder los 255 caracteres.',
              'rol_id.exists': 'El rol seleccionado no existe.',
            },
          })
    
          // Buscar al usuario por su ID
          const usuario = await Usuario.find(params.id)
    
          if (!usuario) {
            return response.status(404).json({
              mensaje: 'Usuario no encontrado',
            })
          }
    
          // Actualizamos los campos del usuario
          usuario.merge(datosValidados)
          await usuario.save()
    
          return response.status(200).json({
            mensaje: 'Usuario actualizado exitosamente',
            data: usuario,
          })
        } catch (error) {
          return response.status(500).json({
            mensaje: 'Error al actualizar el usuario',
            detalles: error.message,
          })
        }
      }

      public async eliminar({ params, response }: HttpContextContract) {
        try {
          // Buscar al usuario por su ID
          const usuario = await Usuario.find(params.id)
      
          if (!usuario) {
            return response.status(404).json({
              mensaje: 'Usuario no encontrado',
            })
          }
      
          await usuario.delete()
      
          return response.status(200).json({
            mensaje: 'Usuario eliminado exitosamente',
          })
        } catch (error) {
          return response.status(500).json({
            mensaje: 'Error al eliminar el usuario',
            detalles: error.message,
          })
        }
      }
      
  }
  
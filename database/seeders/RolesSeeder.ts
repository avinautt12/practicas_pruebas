import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Rol from 'App/Models/Rol'

export default class extends BaseSeeder {
  public async run () {
    await Rol.createMany([
      { 
        nombre: 'invitado'
      },
      { 
        nombre: 'usuario'
      },
      { 
        nombre: 'administrador'
      }
    ])
  }
}

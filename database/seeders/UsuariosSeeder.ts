import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Usuario from 'App/Models/Usuario'

export default class UsuarioSeeder extends BaseSeeder {
  public async run () {
    await Usuario.createMany([
      { nombre: 'Carlos', apellidos: 'Pérez Rodríguez', edad: '20', contrasena: 'contraseña123', rol_id: 2 },
      { nombre: 'Laura', apellidos: 'Gómez Martínez', edad: '21', contrasena: 'contraseña123', rol_id: 2 },
      { nombre: 'Miguel', apellidos: 'Sánchez García', edad: '22', contrasena: 'contraseña123', rol_id: 2 },
      { nombre: 'Ana', apellidos: 'López Fernández', edad: '23', contrasena: 'contraseña123', rol_id: 2 },
      { nombre: 'José', apellidos: 'Martín Pérez', edad: '24', contrasena: 'contraseña123', rol_id: 2 },
      { nombre: 'Marta', apellidos: 'Hernández Ruiz', edad: '25', contrasena: 'contraseña123', rol_id: 2 },
      { nombre: 'David', apellidos: 'Jiménez Sánchez', edad: '26', contrasena: 'contraseña123', rol_id: 2 },
      { nombre: 'Carmen', apellidos: 'García López', edad: '27', contrasena: 'contraseña123', rol_id: 2 },
      { nombre: 'Raúl', apellidos: 'Álvarez González', edad: '28', contrasena: 'contraseña123', rol_id: 2 },
      { nombre: 'Paula', apellidos: 'Martínez Fernández', edad: '29', contrasena: 'contraseña123', rol_id: 2 },
    ])
  }
}

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Roles from 'App/Models/Rol'

export default class Usuario extends BaseModel {
  public static table = 'usuarios'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public apellidos: string

  @column()
  public edad: string

  @column()
  public contrasena: string

  @column()
  public activo: boolean

  @column()
  public rol_id: number 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @belongsTo(() => Roles, {
    foreignKey: 'rol_id', // Especifica la clave foránea
  })
  public rol: BelongsTo<typeof Roles>
}

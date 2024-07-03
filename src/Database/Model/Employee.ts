import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Employee } from '../../Type/Employee'

@Entity({ name: 'employee' })
export class EmployeeModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  positionId!: number

  @Column()
  positionName!: string

  @Column({ nullable: true })
  parentId?: number

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

  transform(): Employee {
    return {
      id: this.id,
      name: this.name,
      positionId: this.positionId,
      positionName: this.positionName,
      parentId: this.parentId,
      created_at: this.created_at.toISOString(),
      updated_at: this.updated_at.toISOString(),
    }
  }
}
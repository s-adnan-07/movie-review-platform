import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm'

@Entity({ name: 'users' })
export class UserEntity {
  @ObjectIdColumn()
  _id: ObjectId

  // Nullable doesn't work here, use class validator
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  // This is the only way to set default values
  @Column({ type: 'string' })
  role = 'local'

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date = new Date()
}

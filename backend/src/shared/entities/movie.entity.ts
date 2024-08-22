import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm'

export type Genre = 'action' | 'comedy' | 'thriller' | 'drama' | 'horror'

@Entity({ name: 'movies' })
export class MovieEntity {
  @ObjectIdColumn()
  _id: ObjectId

  @Column({ nullable: false })
  name: string

  @Column({ type: 'string' })
  genre: Genre

  @Column()
  image: string

  @Column()
  description: string
}

import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm'

@Entity({ name: 'reviews' })
export class ReviewEntity {
  @ObjectIdColumn()
  _id: ObjectId

  @Column('string')
  movie: ObjectId

  @Column()
  movieName: string

  // TODO: integrate with user
  @Column('string')
  user: ObjectId

  @Column()
  userName: string

  // TODO: limit reviews to whole numbers from 1 - 5
  @Column()
  rating: number

  @Column()
  feedback: string
}

import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm'

// TODO: add movie + user field and make it unique
@Entity({ name: 'reviews' })
export class ReviewEntity {
  @ObjectIdColumn()
  _id: ObjectId

  @Column('string')
  movie: ObjectId

  @Column()
  movieName: string

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

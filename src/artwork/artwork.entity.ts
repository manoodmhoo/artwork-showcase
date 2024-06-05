import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'artwork' })
export class Artwork {
  @ObjectIdColumn()
  _id: string;

  @Column()
  imgPath: string;

  @Column()
  artistId: string;

  @Column({ default: null })
  likeCount: number;

  @Column({ default: null })
  createdAt: Date;

  @Column({ default: null })
  updatedAt: Date;
}
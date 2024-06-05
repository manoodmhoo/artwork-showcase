import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'likeArtwork' })
export class LikeArtwork {
  @ObjectIdColumn()
  _id: string;

  @Column()
  userId: string;

  @Column([])
  artworkId: string;
}
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @ObjectIdColumn()
  _id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ default: null })
  imgPath: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  registerAt: Date;
}

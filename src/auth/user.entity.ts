import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'users' })
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

  @Column({ default: 'user' })
  role: string;

  @Column()
  registerAt: Date;
}

import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'artists' })
export class Artist {
    @ObjectIdColumn()
    _id: string;
    
    @Column()
    userId: string;

    @Column({ default: null })
    bio: string;
}
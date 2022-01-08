import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Area {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    area: string;
}
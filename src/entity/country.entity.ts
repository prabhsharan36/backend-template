import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
  } from "typeorm";

  @Entity({ name: "countries" })
  export class Country {
    @PrimaryColumn()
    id!: number;

    @Column()
    code!: string;

    @Column()
    name!: string;

    @Column()
    phonecode!: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @DeleteDateColumn()
    deleted_at!: Date;
  }

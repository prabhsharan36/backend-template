import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";

  @Entity({ name: "taggables" })
  export class Taggable {
    @PrimaryColumn()
    id!: number;

    @Column()
    tag_id!: number;

    @Column()
    taggable_id!: number;

    @Column()
   taggable_type!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

  }

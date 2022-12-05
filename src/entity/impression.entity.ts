import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";

  @Entity({ name: "impressions" })
  export class Impression {
    @PrimaryColumn()
    id!: number;

    @Column()
    impressionable_id!: number;

    @Column()
    count!: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

  }

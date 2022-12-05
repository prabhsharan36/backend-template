import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
  } from "typeorm";

  @Entity({ name: "engagements" })
  export class Engagement {
    @PrimaryColumn()
    id!: number;

    @Column()
    user_id!: number;

    @Column()
    user_type!: string;

    @Column()
    entity_id!: string;

    @Column()
    entity_type!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @DeleteDateColumn()
    deleted_at!: Date;
  }

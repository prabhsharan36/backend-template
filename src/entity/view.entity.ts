import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";

  @Entity({ name: "views" })
  export class View {
    @PrimaryColumn()
    id!: number;

    @Column()
    viewable_id!: number;

    @Column()
    viewable_type!: string;

    @Column()
    count!: number;

    @Column()
    viewed_at!:Date;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

  }

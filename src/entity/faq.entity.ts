import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
  } from "typeorm";

  @Entity({ name: "faqs" })
  export class Faq {
    @PrimaryColumn()
    id!: number;

    @Column()
    question!: string;

    @Column()
    answer!: string;

    @Column()
    status_id!:number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @DeleteDateColumn()
    deleted_at!: Date;
  }

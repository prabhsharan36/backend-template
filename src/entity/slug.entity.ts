import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
  } from "typeorm";

  @Entity({ name: "slugs" })
  export class Slug {
    @PrimaryColumn()
    id!: number;

      @Column()
      sluggable_id!: number;

    @Column()
    sluggable_type!: string;

    @Column()
    slug!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @DeleteDateColumn()
    deleted_at!: Date;

  }

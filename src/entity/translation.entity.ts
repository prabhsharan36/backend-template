import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
  } from "typeorm";

  @Entity({ name: "translations" })
  export class Translation {
    @PrimaryColumn()
    id!: number;

    @Column()
    translatable_id!: number;

    @Column()
    translatable_type!: string;

    @Column({ type: "simple-json" })
    translation!: any;

    @Column()
    language_code!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @DeleteDateColumn()
    deleted_at!: Date;

  }

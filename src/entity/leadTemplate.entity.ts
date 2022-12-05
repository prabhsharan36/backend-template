import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
  } from "typeorm";

  @Entity({ name: "lead_templates" })
  export class LeadTemplate {
    @PrimaryColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    type!: string;

    @Column({ type: "simple-json" })
    template_data!: any;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @DeleteDateColumn()
    deleted_at!: Date;

  }

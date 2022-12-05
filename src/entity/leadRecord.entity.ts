import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";

  @Entity({ name: "lead_records" })
  export class LeadRecord {
    @PrimaryColumn()
    id!: number;

    @Column()
    lead_name!: string;

    @Column()
    lead_source!: string;

    @Column()
    lead_email!: string;

    @Column()
    country_id!: number;

    @Column()
    lead_country!: string;

    @Column()
    lead_contact!: string;

    @Column()
    message!: string;

    @Column()
    lead_type_flag!: number;

    @Column()
    service_id!: number;

    @Column()
    specialization_id!: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

  }

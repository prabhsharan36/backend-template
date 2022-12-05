import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
  } from "typeorm";

  @Entity({ name: "service_providers" })
  export class ServiceProvider {
    @PrimaryColumn()
    id!: number;

    @Column()
    service_providers_id!: number;

    @Column()
    service_providers_type!: string;

    @Column()
    service_id!: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @DeleteDateColumn()
    deleted_at!: Date;
  }

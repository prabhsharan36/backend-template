import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, 
  } from "typeorm";
  
  @Entity({ name: "service_specialization_cleanup" })
  export class ServiceSpecializationCleanup {
    @PrimaryColumn()
    id!: number;
    
    @Column() 
    entity_id!: number;

    @Column()
    entity_type!: string;
  
    @Column()
    entity_slug!: string;

    @Column() 
    replace_with_id!: string;

    @Column() 
    replace_with_type!: string;

    @Column() 
    replace_with_name!: string;

    @Column() 
    replace_with_slug!: string;

    @Column() 
    action!: string;

    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
  }
  
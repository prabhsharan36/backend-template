import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn, 
  } from "typeorm";
  
  @Entity({ name: "specialization_services" })
  export class SpecializationService {
    @PrimaryColumn()
    id!: number;
    
    @Column() 
    specialization_id!: number;
  
    @Column() 
    service_id!: number;
  
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @DeleteDateColumn()
    deleted_at!: Date;

  }
  
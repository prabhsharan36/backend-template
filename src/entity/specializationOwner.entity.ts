import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn, 
  } from "typeorm";
  
  @Entity({ name: "specialization_owners" })
  export class SpecializationOwner {
    @PrimaryColumn()
    id!: number;
    
    @Column() 
    specialization_owners_id!: number;
  
    @Column()
    specialization_owner_type!: string;
    
    @Column()
    specialization_id!: number;
    
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @DeleteDateColumn()
    deleted_at!: Date;

  }
  
import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn, 
  } from "typeorm";
  
  @Entity({ name: "categories" })
  export class Category {
    @PrimaryColumn()
    id!: number;
  
    @Column()
    name!: string;
  
    @Column() 
    parent_id!: number;
    

    @Column() 
    facility_listing_type!: string;

    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @DeleteDateColumn()
    deleted_at!: Date;

  }
  
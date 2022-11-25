import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn, 
  } from "typeorm";
  
  @Entity({ name: "specializations" })
  export class Specialization {
    @PrimaryColumn()
    id!: number;
  
    @Column()
    name!: string;
  
    @Column() 
    common_name!: string;
  
    @Column()
    adjective!: string;
  
    @Column()
    description!: string;
  
    @Column()
    has_country_page!: number;
  
    @Column()
    has_city_page!: number;
  
    @Column()
    has_area_page!: number;
  
    @Column()
    status_id!: number;
  
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @DeleteDateColumn()
    deleted_at!: Date;
  }
  
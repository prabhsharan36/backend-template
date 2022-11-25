import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn, 
  } from "typeorm";
  
  @Entity({ name: "services" })
  export class Service {
    @PrimaryColumn()
    id!: number;
  
    @Column()
    name!: string;
  
    @Column() 
    common_name!: string;
    
    @Column() 
    type!: string;
    
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
  
    @Column({ type: "simple-json" })
    meta_data!: any;
    
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @DeleteDateColumn()
    deleted_at!: Date;

    @Column()
    adjective!: string;
  
  }
  
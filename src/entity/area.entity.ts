import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn, 
  } from "typeorm";
  
  @Entity({ name: "areas" })
  export class Area {
    @PrimaryColumn()
    id!: number;
  
    @Column()
    name!: string;
  
    @Column() 
    city_id!: number;
    
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @DeleteDateColumn()
    deleted_at!: Date;

    @Column()
    latitude!: number;
    
    @Column()
    longitude!: number;
  
    @Column()
    place_id!: string;
  
    @Column({ type: "simple-json" })
    meta_data!: any;
  
  }
  
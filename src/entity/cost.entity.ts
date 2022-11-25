import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, 
  } from "typeorm";
  
  @Entity({ name: "costs" })
  export class Cost {
    @PrimaryColumn()
    id!: number;
  
    @Column()
    costable_id!: number;
  
    @Column()
    costable_type!: string;
  
    @Column() 
    location_id!: number;
    
    @Column() 
    location_type!: string;

    @Column()
    min!: number;

    @Column()
    avg!: number;

    @Column()
    max!: number;

    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  

  }
  
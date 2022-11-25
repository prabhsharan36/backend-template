import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn, 
  } from "typeorm";
  
  @Entity({ name: "cities" })
  export class City {
    @PrimaryColumn()
    id!: number;
  
    @Column()
    name!: string;
  
    @Column() 
    state_id!: number;

    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @DeleteDateColumn()
    deleted_at!: Date;

  }
  
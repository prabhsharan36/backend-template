import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn, 
  } from "typeorm";
  
  @Entity({ name: "tags" })
  export class Tag {
    @PrimaryColumn()
    id!: number;
    
    @Column() 
    tag!: string;
  
    @Column()
    description!: string;

    @Column()
    owner_id!: number;
    
    @Column()
    owner_type!: string;
    
    @Column()
    status_id!: string;

    @CreateDateColumn()
    created_at!: Date;
    
    @UpdateDateColumn()
    updated_at!: Date;
    
    @DeleteDateColumn()
    deleted_at!: Date;

  }
  
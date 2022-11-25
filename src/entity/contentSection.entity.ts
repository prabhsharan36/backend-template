import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    // DeleteDateColumn,
    UpdateDateColumn, 
  } from "typeorm";
  
  @Entity({ name: "content_sections" })
  export class ContentSection {
    @PrimaryColumn()
    id!: number;
  
    @Column()
    title!: string;
  
    @Column()
    body!: string;

    @Column() 
    owner_id!: number;

    @Column()
    owner_type!: string;
    
    @Column()
    order!: number;

    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;

  }
  
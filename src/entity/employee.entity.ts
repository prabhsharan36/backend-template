import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn, 
  } from "typeorm";
  
  @Entity({ name: "employees" })
  export class Employee {
    @PrimaryColumn()
    id!: number;
  
    @Column()
    first_name!: string;
  
    @Column()
    last_name!: string;
  
    @Column()
    email!: string;
  
    @Column()
    title!: string;
  
    @Column()
    bio!: string;
  
    @Column() 
    website!: string;

    @Column()
    email_verified_at!: Date;

    @Column()
    password!:string;
    
    @Column()
    remember_token!:string;

    @Column()
    is_active!:number;

    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @DeleteDateColumn()
    deleted_at!: Date;
  }
  
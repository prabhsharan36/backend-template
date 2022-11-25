import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, 
  } from "typeorm";
  
  @Entity({ name: "iclinicsoft_followup_reminders" })
  export class IclinicsoftFollowupReminder {
    @PrimaryColumn()
    id!: number;

    @Column()
    caller_id!: number;
  
    @Column()
    client_name!: string;
  
    @Column()
    client_phone!: string;
  
    @Column()
    followup_date_time!:Date;
    
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
  }
  
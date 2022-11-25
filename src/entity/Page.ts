import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn, 
} from "typeorm";

@Entity({ name: "pages" })
export class Page {
  @PrimaryColumn()
  id!: number;

  @Column()
  url!: string;

  @Column() 
  title!: string;

  @Column()
  canonical!: string;

  @Column()
  description!: string;

  @Column({ type: "simple-json" })
  meta_data!: any;

  @Column()
  redirect_url!: string;

  @Column()
  redirect_status!: number;

  @Column()
  type!: string;

  @Column()
  is_active!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

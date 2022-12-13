import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "media" })
export class Media {
  @PrimaryColumn()
  id!: number;

  @Column()
  entity_id!: number;

  @Column()
  entity_type!: string;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column()
  public_url!: string;

  @Column()
  storage_path!: string;

  @Column()
  size_in_bytes!: string;

  @Column()
  purpose!: string;

  @Column()
  alt_tag!: string;

  @Column()
  source!: string;

  @Column()
  keyword!: string;

  @Column()
  status!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  /**
   * Relationships
   */
}

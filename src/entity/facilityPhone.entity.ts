import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "facility_phones" })
export class FacilityPhone {
  @PrimaryColumn()
  id!: number;

  @Column()
  facility_id!: number;

  @Column()
  phone!: string;

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

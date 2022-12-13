import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "facility_amenities" })
export class FacilityAmenity {
  @PrimaryColumn()
  id!: number;

  @Column()
  facility_id!: number;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  /**
   * Relationships
   */
}

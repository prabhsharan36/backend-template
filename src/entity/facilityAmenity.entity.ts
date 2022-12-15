import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Facility } from "./facility.entity";

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
  @ManyToOne(() => Facility, (facility) => facility.facilityAmenities)
  @JoinColumn({ name: "facility_id", referencedColumnName: "id" })
  facility!: Facility;
}

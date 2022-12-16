import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { DoctorVisit } from "./doctorVisit.entity";
import { FacilityAmenity } from "./facilityAmenity.entity";

@Entity({ name: "facilities" })
export class Facility {
  @PrimaryColumn()
  id!: number;

  @Column()
  organisation_id!: number;

  @Column()
  type!: string;

  @Column()
  name!: string;

  @Column()
  about!: string;

  @Column()
  established_in!: number;

  @Column()
  website!: string;

  @Column()
  beds!: string;

  @Column()
  ambulance!: string;

  @Column()
  emergency_number!: string;

  @Column()
  address_line!: string;

  @Column()
  additional_address_line!: string;

  @Column()
  landmark!: string;

  @Column()
  area_id!: number;

  @Column()
  city_id!: number;

  @Column()
  country_id!: number;

  @Column()
  latitude!: number;

  @Column()
  longitude!: number;

  @Column()
  status_id!: number;

  @Column({ type: "simple-json" })
  meta_data!: any;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @OneToMany(() => DoctorVisit, (doctorVisit) => doctorVisit.facility)
  doctorVisits!: DoctorVisit[];
  
  @OneToMany(() =>FacilityAmenity, (facilityAmenity)=>facilityAmenity.facility)
  facilityAmenities!: FacilityAmenity[];
}

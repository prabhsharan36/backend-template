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

@Entity({ name: "doctors" })
export class Doctor {
  @PrimaryColumn()
  id!: number;

  @Column()
  title_name!: string;

  @Column()
  first_name!: string;

  @Column()
  middle_name!: string;

  @Column()
  last_name!: string;

  @Column()
  gender!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  start_year!: string;

  @Column()
  city_id!: number;

  @Column()
  website!: string;

  @Column()
  bio!: string;

  @Column()
  autogenerated_bio!: number;

  @Column()
  promotion!: number;

  @Column()
  is_mobile_app_user!: number;

  @Column()
  verified_at!: Date;

  @Column()
  status_id!: number;

  @Column()
  is_mt_associated!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @OneToMany(() => DoctorVisit, (doctorVisit) => doctorVisit.doctor)
  doctorVisits!: DoctorVisit[];
}

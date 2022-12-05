import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Doctor } from "./doctor.entity";
import { Facility } from "./facility.entity";

@Entity({ name: "doctor_visits" })
export class DoctorVisit {
  @PrimaryColumn()
  id!: number;

  @Column()
  doctor_id!: number;

  @Column()
  facility_id!: number;

  @Column()
  fee!: number;

  @Column()
  on_call!: number;

  @Column()
  verified_on!: Date;

  @Column({ type: "simple-json" })
  visiting_hours!: any;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @ManyToOne(() => Doctor, (doctor) => doctor.doctorVisits)
  @JoinColumn({ name: "doctor_id", referencedColumnName: "id" })
  doctor!: Doctor;

  @ManyToOne(() => Facility, (facility) => facility.doctorVisits)
  @JoinColumn({ name: "facility_id", referencedColumnName: "id" })
  facility!: Facility;
}

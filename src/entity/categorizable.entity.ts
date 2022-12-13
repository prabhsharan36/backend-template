import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "categorizables" })
export class Categorizable {
  @PrimaryColumn()
  id!: number;

  @Column()
  categorizable_id!: number;

  @Column()
  categorizable_type!: string;

  @Column()
  category_id!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

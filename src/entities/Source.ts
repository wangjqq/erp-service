import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Source {
  @PrimaryGeneratedColumn({ comment: "渠道id" })
  id: number;

  @Column({ type: "varchar", length: 255, comment: "名称" })
  name: string;

  @Column({ type: "varchar", length: 255, comment: "地址" })
  address: string;

  @Column({ type: "varchar", length: 20, comment: "电话" })
  phone: string;

  @Column({ type: "varchar", length: 255, comment: "主营" })
  mainBusiness: string;

  @Column({ type: "enum", enum: ["低", "中", "高"], comment: "价格优势" })
  priceAdvantage: "低" | "中" | "高";

  @Column({
    type: "simple-array",
    comment: "类型 (可多选: 进货渠道/出货渠道)",
  })
  types: string[];

  @Column({ type: "int", default: 0, comment: "交易次数" })
  transactionCount: number;

  @CreateDateColumn({
    precision: 0,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(0)",
    comment: "创建日期",
  })
  created_at: Date;

  @UpdateDateColumn({
    precision: 0,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(0)",
    onUpdate: "CURRENT_TIMESTAMP(0)",
    comment: "更新日期",
  })
  updated_at: Date;
}

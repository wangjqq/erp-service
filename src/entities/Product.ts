import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ comment: "产品id" })
  id: number;

  @Column({ type: "varchar", length: 255, comment: "大类" })
  primary_category: string;

  @Column({ type: "varchar", length: 255, comment: "中类" })
  secondary_category: string;

  @Column({ type: "varchar", length: 255, comment: "小类" })
  tertiary_category: string;

  @Column({ type: "text", comment: "产品描述" })
  description: string;

  @Column({ type: "int", comment: "库存数量" })
  quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2, comment: "平均进货价格" })
  average_cost_price: number;

  @Column({ type: "decimal", precision: 10, scale: 2, comment: "平均预计售价" })
  average_anticipated_price: number;

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

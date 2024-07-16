import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class InventoryRecord {
  @PrimaryGeneratedColumn({ comment: "库存记录id" })
  id: number;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: "CASCADE" })
  product: Product;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "SET NULL" })
  user: User;

  @Column({ type: "int", comment: "变动数量" })
  change: number;

  @Column({ type: "varchar", length: 255, comment: "变动类型" })
  type: string; // 'in', 'out', 'revoke'

  @Column({ type: "text", comment: "备注" })
  remark: string;

  @CreateDateColumn({
    precision: 0,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(0)",
    comment: "记录日期",
  })
  created_at: Date;
}

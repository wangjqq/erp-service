import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Product } from './Product'
import { User } from './User'
import { Source } from './Source'

@Entity()
export class InventoryRecord {
  @PrimaryGeneratedColumn({ comment: '库存记录id' })
  id: number

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'SET NULL' })
  product: Product

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  user: User

  @Column({ type: 'int', comment: '变动数量' })
  change: number

  @Column({ type: 'varchar', length: 255, comment: "变动类型 'in', 'out'" })
  type: string

  @Column({ type: 'boolean', comment: '是否撤回' })
  state: boolean

  @Column({ type: 'text', comment: '备注' })
  remark: string

  @Column({ type: 'decimal', precision: 10, scale: 2, comment: '进货价格' })
  cost_price: number

  @Column({ type: 'decimal', precision: 10, scale: 2, comment: '预计售价' })
  anticipated_price: number

  @Column({ type: 'varchar', length: 255, comment: 'sn码' })
  sn_code: string

  @ManyToOne(() => Source, (source) => source.id, { onDelete: 'SET NULL' })
  source: Source

  @CreateDateColumn({
    precision: 0,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
    comment: '记录日期',
  })
  created_at: Date
}

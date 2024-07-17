import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm'

@Entity()
@Tree('closure-table') // 使用闭包表策略
export class HardwareCategory {
  @PrimaryGeneratedColumn({ comment: '类型id' })
  id: number

  @Column({ type: 'varchar', length: 255, comment: '类型名称' })
  name: string

  @TreeChildren({ cascade: true }) // 定义子节点
  children: HardwareCategory[]

  @TreeParent({ onDelete: 'CASCADE' }) // 定义父节点
  parent: HardwareCategory

  @CreateDateColumn({ precision: 0, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(0)', comment: '创建日期' })
  created_at: Date

  @UpdateDateColumn({
    precision: 0,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
    onUpdate: 'CURRENT_TIMESTAMP(0)',
    comment: '更新日期',
  })
  updated_at: Date
}

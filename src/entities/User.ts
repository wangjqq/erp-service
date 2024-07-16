import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn({ comment: '用户id' })
  id: number

  @Column({ type: 'varchar', length: 255, comment: '用户名' })
  username: string

  @Column({ type: 'varchar', length: 255, comment: '哈希化密码' })
  password_hash: string

  @Column({ type: 'varchar', length: 255, comment: '用户邮箱' })
  email: string

  @Column({ nullable: true, comment: '最后登录日期' }) // 允许为空，因为第一次登录时可能为 null
  lastLoginAt: Date

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

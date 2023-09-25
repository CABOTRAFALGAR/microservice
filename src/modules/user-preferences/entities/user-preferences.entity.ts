import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users-preferences')
export class UserPreferencesEntity {
  @PrimaryColumn({ nullable: false, length: 50 })
  public userId: string;

  @Column({ type: 'longtext' })
  public data: string;
}

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users-projects-preferences')
export class UserProjectPreferencesEntity {
  @PrimaryColumn({ nullable: false, length: 50 })
  public userId: string;

  @PrimaryColumn({ nullable: false, length: 50 })
  public projectId: string;

  @Column({ type: 'longtext' })
  public data: string;
}

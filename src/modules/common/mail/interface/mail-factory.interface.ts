import { IMailInfo } from './mail-info.interface';

export interface IMailFactory {
  initializeMail(mailInfo: IMailInfo, mailType?: string): Promise<any>;
}

import { IMailInfo } from './mail-info.interface';

export interface IMailService {
  send?(mail: string, recipient: string, data?: object): Promise<any>;
  sendMail?(mailInfo: IMailInfo, type?: string): Promise<any>;
}

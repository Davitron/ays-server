import { Injectable} from '@nestjs/common';
import { IMailService } from '../interface/mailer.interface';
import { IMailInfo } from '../interface/mail-info.interface';
import { MailFactory } from '../mail.factory';

@Injectable()
export class MailService implements IMailService {
  constructor(private mailFactory: MailFactory) {}

  public async sendMail(mailInfo: IMailInfo, type?: string) {
    if (type) {
      return await this.mailFactory.initializeMail(mailInfo, type);
    } else {
      return await this.mailFactory.initializeMail(mailInfo);
    }
  }
}

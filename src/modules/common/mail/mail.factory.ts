import { IMailFactory } from './interface/mail-factory.interface';
import { IMailInfo } from './interface/mail-info.interface';
import { Injectable } from '@nestjs/common';
import { RawMailService } from './services/raw-mail.service';
import { TemplateMailService } from './services/template-mail.service';

@Injectable()
export class MailFactory implements IMailFactory {
  constructor(
    private rawMailService: RawMailService,
    private templateMailService: TemplateMailService,
  ) {}

  async initializeMail(mailInfo: IMailInfo, mailType?: string): Promise<any> {
    if (mailType === 'raw') {
      const { recipient, message } = mailInfo;
      return await this.rawMailService.send(message, recipient);
    } else {
      const { template, recipient, data } = mailInfo;
      return await this.templateMailService.send(template, recipient, data);
    }
  }
}

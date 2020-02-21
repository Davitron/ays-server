import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { IMailService } from '../interface/mailer.interface';

@Injectable()
export class TemplateMailService implements IMailService {
  constructor(private mailerService: MailerService) {}

  public async send(template: string, recipient: string, data?: object): Promise<any> {
    throw new Error('method not impemented');
  }
}

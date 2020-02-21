import { Injectable } from '@nestjs/common';
import { IMailService } from '../interface/mailer.interface';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class RawMailService implements IMailService {

  constructor(private mailerService: MailerService) {}

  public async send(message: string, recipient: string): Promise<any> {
    const feedback = await this.mailerService.sendMail({
      to: recipient,
      subject: 'Testing Nest MailerModule ✔',
      html: message,
    });
    return feedback;
  }
}

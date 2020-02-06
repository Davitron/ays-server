import { Injectable} from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { IMailService } from './interface/mailer.interface';

@Injectable()
export class MailService implements IMailService {

  constructor(private mailerService: MailerService) {}

  public async sendRaw(message: string, recipient: string): Promise<any> {
    const feedback = await this.mailerService.sendMail({
      to: recipient,
      subject: 'Testing Nest MailerModule ✔',
      text: message,
    });
    return feedback;
  }

  sendTemplate(template: string, recipient: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

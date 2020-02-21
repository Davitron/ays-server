import { Module } from '@nestjs/common';
import { RawMailService } from './services/raw-mail.service';
import { TemplateMailService } from './services/template-mail.service';
import { MailService } from './services/mail.service';
import { MailFactory } from './mail.factory';
import { MailerModule } from '@nest-modules/mailer';

@Module({
  imports: [MailerModule],
  providers: [RawMailService, TemplateMailService, MailFactory, MailService],
  exports: [MailService],
})

export class MailModule {}

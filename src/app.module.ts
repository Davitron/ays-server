import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule, PugAdapter } from '@nest-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secureConnection: false,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      },
      defaults: {
        from: '"SHUT THE FUCK UP" matthews.segun@gmail.com',
      },
      // template: {
      //   dir: __dirname + '/templates',
      //   adapter: new PugAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

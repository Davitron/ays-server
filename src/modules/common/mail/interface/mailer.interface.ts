export interface IMailService {
  sendRaw(message: string, recipient: string): Promise<any>;
  sendTemplate(template: string, recipient: string): Promise<any>;
}

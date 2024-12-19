import { EmailAlertChannel } from 'checkly/constructs'

export const emailChannel = new EmailAlertChannel('email-channel-1', {
  address: 'raccoon@checklyhq.com',
})
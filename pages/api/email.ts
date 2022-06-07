import formData from 'form-data'
import Mailgun from 'mailgun.js'

const API_KEY = 'pubkey-2ec0e5844995333033e53401911b55fc'
const DOMAIN = 'sandbox3f5472c413ce4fc99bf2feed9344650f.mailgun.org'

const mailgun = new Mailgun(formData)
const client = mailgun.client({ username: 'api', key: API_KEY })
console.log(client)

const messageData = {
  from: `Mailgun Sandbox <postmaster@sandbox3f5472c413ce4fc99bf2feed9344650f.mailgun.org>`,
  to: ['omartareketman@gmail.com'],
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!',
}

client.messages
  .create(DOMAIN, messageData)
  .then((res: {}) => {
    console.log(res)
  })
  .catch((err: {}) => {
    console.error(err)
  })

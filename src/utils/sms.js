export function sendSMS(phone, message) {
  const log = JSON.parse(localStorage.getItem('hib_sms_log') || '[]')
  const entry = { phone, message, time: new Date().toISOString() }
  log.push(entry)
  localStorage.setItem('hib_sms_log', JSON.stringify(log))
  console.info('SMS sent', entry)
}

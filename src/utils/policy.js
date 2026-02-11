export function generatePolicyNumber() {
  const t = Date.now().toString().slice(-8)
  return `POL-${t}`
}

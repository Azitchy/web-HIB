export const readApps = () => {
  try {
    return JSON.parse(localStorage.getItem('hib_applications') || '[]')
  } catch (e) {
    return []
  }
}

export const writeApps = (apps) => {
  localStorage.setItem('hib_applications', JSON.stringify(apps))
}

export const pushApp = (app) => {
  const apps = readApps()
  apps.push(app)
  writeApps(apps)
}

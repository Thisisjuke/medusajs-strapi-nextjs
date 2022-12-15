export default [
  {
    method: 'GET',
    path: '/settings',
    handler: 'medusaSettings.getSettings',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/settings',
    handler: 'medusaSettings.setSettings',
    config: {
      policies: [],
      auth: false,
    },
  },
]

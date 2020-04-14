import { defineAbility } from '@casl/ability'

export default defineAbility((can) => {
  const permissions = ufhy.permissions ? ufhy.permissions : []

  permissions.forEach(permission => {
    can(permission)
  });
})
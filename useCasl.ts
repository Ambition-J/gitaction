import { AbilityBuilder, Ability } from '@casl/ability'
import { permittedFieldsOf } from '@casl/ability/extra'
class Work {
  constructor(attr: Record<string, any>) {
    Object.assign(this, attr)
  }
}

interface IUser {
  id: number
  role: 'admin' | 'vip' | 'normal'
}

const adminUser: IUser = {
  id: 1,
  role: 'admin',
}
const vipUser: IUser = {
  id: 2,
  role: 'vip',
}
const normalUser: IUser = {
  id: 3,
  role: 'normal',
}
const workFileds = ['id', 'auhtor', 'title', 'content', 'uuid']
const options = {
  fieldsFrom: (rule: { fields?: string[] }) => rule.fields || workFileds,
}
// const templateWork = new Work({ id: 1, isTemplate: true })
// const notTemplateWork = new Work({ id: 2, isTemplate: false })
const vipWork = new Work({
  id: 1,
  author: 2,
  title: 'test',
  contnet: '123',
  uuid: '123123',
})
const normalWork = new Work({
  id: 2,
  author: 3,
  title: 'test',
  contnet: '123',
  uuid: '123123',
})

function definRules(user: IUser) {
  const { can, cannot, build } = new AbilityBuilder(Ability)
  if (user.role === 'admin') {
    can('manage', 'all') // 管理所有
  } else if (user.role === 'vip') {
    can('download', 'Work')
    can('read', 'Work')
    can('delete', 'Work', { author: user.id })
    can('update', 'Work', ['title', 'content', 'uuid'], { author: user.id })
  }
  if (user.role === 'normal' || user.role === 'vip') {
    can('read', 'Work')
    can('delete', 'Work', { author: user.id })
    can('update', 'Work', ['title', 'content'], { author: user.id })
  }
  return build()
}

const admin_user = definRules(adminUser)
const vip_user = definRules(vipUser)
const normal_user = definRules(normalUser)
// console.log('read work', rules.can('read', 'Work'))
// console.log('delete work', rules.can('delete', 'Work'))
// console.log('update work', rules.can('update', 'Work'))

// console.log('update template work object', rules.can('update', templateWork))
// console.log(
//   'update not template work object',
//   rules.can('update', notTemplateWork)
// )

// admin rules
// console.log('admin_user delete ', admin_user.can('delete',ownWork))
// console.log('admin_user read ', admin_user.can('read',ownWork))
// console.log('admin_user update ', admin_user.can('update',notOwnWork))

// vip rules
// console.log('vip_user delete ', vip_user.can('delete',ownWork))
// console.log('vip_user download ownWork', vip_user.can('download',ownWork))
// console.log('vip_user download notOwnWork', vip_user.can('download',ownWork))
// console.log('vip_user update ', vip_user.can('update',notOwnWork))

// normal rules
// console.log('normal_user delete ownWork', normal_user.can('delete', vipWork))
// console.log(
//   'normal_user delete notOwnWork',
//   normal_user.can('delete', normalWork)
// )
// console.log(
//   'normal_user download ownWork',
//   normal_user.can('download', vipWork)
// )
// console.log(
//   'normal_user download notOwnWork',
//   normal_user.can('download', vipWork)
// )
// console.log(
//   'normal_user update notOwnWork',
//   normal_user.can('update', normalWork)
// )
// console.log('normal_user update ownWork', normal_user.can('update', vipWork))

// 检查可以更新的字段
console.log(
  'admin rules can update',
  permittedFieldsOf(admin_user, 'update', vipWork, options)
)
console.log(
  'vip rules can update',
  permittedFieldsOf(vip_user, 'update', vipWork, options)
)
console.log(
  'normal rules can update',
  permittedFieldsOf(normal_user, 'update', normalWork, options)
)

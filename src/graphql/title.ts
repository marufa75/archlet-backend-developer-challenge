import { objectType } from 'nexus'

export const Title = objectType({
  name: 'Title',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('label')
    t.nonNull.string('field')
    t.nonNull.boolean('forBuyer')
  },
})

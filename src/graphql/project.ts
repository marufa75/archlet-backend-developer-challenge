import { objectType } from 'nexus'

export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.nonNull.list.nonNull.field('titles', {
      type: 'Title',
      resolve: (parent, _args, context) => {
        return context.prisma.title.findMany({
          where: { projectId: parent.id },
        })
      },
    })
    t.nonNull.list.nonNull.field('buyers', {
      type: 'Buyer',
      resolve: (parent, _args, context) => {
        return context.prisma.buyer.findMany({
          where: { projectId: parent.id },
        })
      },
    })
  },
})

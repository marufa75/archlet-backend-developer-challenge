import { idArg, nonNull, objectType } from 'nexus'

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('organizations', {
      type: 'Organization',
      resolve: (_parent, _args, context) => {
        return context.prisma.organization.findMany()
      },
    })
    t.field('organization', {
      type: 'Organization',
      args: { id: nonNull(idArg()) },
      resolve: (_parent, args, context) => {
        return context.prisma.organization.findUnique({
          where: { id: args.id },
        })
      },
    })
    t.field('project', {
      type: 'Project',
      args: { id: nonNull(idArg()) , organizationId: nonNull(idArg()) },
      resolve: (_parent, args, context) => {
        return context.prisma.project.findFirst({
          where: { id: args.id, organizationId: args.organizationId },
        })
      },
    })
  },
})

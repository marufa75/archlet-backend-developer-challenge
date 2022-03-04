import { objectType } from 'nexus'

export const Buyer = objectType({
  name: 'Buyer',
  definition(t) {
    t.nonNull.id('id')

    t.nonNull.list.nonNull.field('suppliers', {
      type: 'Supplier',
      resolve: (parent, _args, context) => {
        return context.prisma.suppliers.findMany({
          where: { buyerId: parent.id },
        })
      },
    })

    t.string('txt01')
    t.string('txt02')
    t.string('txt03')
    t.string('txt04')
    t.string('txt05')
    t.string('txt06')
    t.string('txt07')
    t.string('txt08')
    t.string('txt09')
    t.string('txt10')

    t.int('int01')
    t.int('int02')
    t.int('int03')
    t.int('int04')
    t.int('int05')
    t.int('int06')
    t.int('int07')
    t.int('int08')
    t.int('int09')
    t.int('int10')

    t.float('flt01')
    t.float('flt02')
    t.float('flt03')
    t.float('flt04')
    t.float('flt05')
    t.float('flt06')
    t.float('flt07')
    t.float('flt08')
    t.float('flt09')
    t.float('flt10')

  },
})

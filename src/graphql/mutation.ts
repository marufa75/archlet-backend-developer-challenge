import { Workbook } from 'exceljs'
import { idArg, mutationField, nonNull, stringArg } from 'nexus'

export const uploadBidsheet = mutationField('uploadBidsheet', {
  type: 'Project',
  args: {
    organizationId: nonNull(idArg()),
    projectName: nonNull(stringArg()),
    file: nonNull('Upload'),
  },
  resolve: async (_parent, args, { prisma }) => {
    const { filename, mimetype, createReadStream } = await args.file
    const stream = createReadStream()

    const workbook = new Workbook()
    await workbook.xlsx.read(stream)

    if (workbook.worksheets.length === 0) return null

    const worksheet = workbook.worksheets[0]

    const newProject = await prisma.project.create({
      data: {
        name: args.projectName,
        organizationId: args.organizationId,
      },
    })

    /**
     * TODO: Add your code to parse the uploaded excel file and save it to the database.
     */
    console.log({ filename, mimetype, workbook })

    return newProject
  },
})

import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { GraphQLSchema } from 'graphql'
import { graphqlUploadExpress } from 'graphql-upload'
import http from 'http'
import { context } from './context'
import { schema } from './schema'

async function startApolloServer() {
  // Required logic for integrating with Express
  const app = express()
  const httpServer = http.createServer(app)

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }))

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    schema: schema as unknown as GraphQLSchema,
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  // More required logic for integrating with Express
  await server.start()
  server.applyMiddleware({
    app,
  })

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  )
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer()

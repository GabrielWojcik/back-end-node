import { fastify } from 'fastify'
// import { Databasememory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

// const database = new Databasememory()
const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

 await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search

    console.log(search)

    const videos = await database.list()

    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    await database.delete(videoId)

    return reply.status(204).send()
})


server.listen({
    port: process.env.PORT ?? 3333,
})




// forma pura do nodejs
// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('oi')
//     return response.end()
// })

// server.listen(3333)
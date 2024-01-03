const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const cors = require('cors')
const { validator, partialValidator } = require('./schemas/zod')


const server = express()
// defino las rutas que seran accesibles
server.disable('x-powered-by')

// usamos esto para poder acceder luego a el body enviado por el usuario
server.use(express.json())
server.use(cors({
  origin: ['http://localhost:1234', 'http://127.0.0.1:5500', 'otra ruta etc'], // Agrega los orígenes permitidos aquí
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] // Especifica los métodos permitidos
}))

server.get('/', (req, res) => {
  res.send('<h1>Bienvenido a mi Kors</h1>')
})

server.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    // verificamos si tenemos un gentero en caso de tenerlo las pelis seran iguales a las peliculas filtradas por su genero en donde algun genero incluta el gener busaco en lowercase
    const pelis = movies.filter((movie) =>
      movie.genre.some(
        (gen) => gen.toLocaleLowerCase() === genre.toLocaleLowerCase()
      )
    )
    res.json(pelis)
    return
  }
  res.json(movies)
})

server.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  movie
    ? res.json(movie)
    : res.status(404).json({ message: 'movie not found' })
})

server.post('/movies', (req, res) => {
  const resultado = validator(req.body)

  if (resultado.error) {
    return res.status(400).json({ error: JSON.parse(resultado.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...resultado.data
  }
  // esto no seria rest
  movies.push(newMovie)
  console.log('peli creada correctamente')
  res.status(201).json(movies)
})

server.patch('/movies/:id', (req, res) => {
  const resultado = partialValidator(req.body)
  if (resultado.error) {
    return res.status(400).json({ error: JSON.parse(resultado.error.message) })
  }
  const { id } = req.params
  const moveIndex = movies.findIndex((movie) => movie.id === id)
  if (moveIndex === -1) {
    return res.status(404).json({ message: 'movie not found' })
  }
  const updateMOvie = {
    ...movies[moveIndex],
    ...resultado.data
  }
  movies[moveIndex] = updateMOvie
  res.status(202).json(updateMOvie)
})

server.use('*', (req, res) => {
  res.status(404).send('<h1>Page not found try again</h1>')
})

const PORT = process.env.PORT ?? 1234

server.listen(PORT, () => {
  console.log(`escuchando en el puerto  https://localhost:${PORT}`)
})

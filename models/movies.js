import { readJSON } from '../require.js'
import { randomUUID } from 'node:crypto'

const movies = readJSON('./movies.json')

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      // Verificamos si se proporcionó un género. Si es así, filtramos las películas por ese género.
      const filteredMovies = movies.filter(movie =>
        movie.genre.some(
          gen => gen.toLowerCase() === genre.toLowerCase()
        )
      )
      return (filteredMovies)
    }

    // Si no se proporciona un género, devolvemos todas las películas.
    return movies
  }

  static async getByID ({ id }) {
    // no me ando con bromas y retorno directamente la peli si la encuentro
    return movies.find(movie => movie.id === id)
  }

  static async createMovie ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }
    // esto no seria rest
    movies.push(newMovie)
    return newMovie
  }

  static async deleteMovie ({ id }) {
    const moveIndex = movies.findIndex((movie) => movie.id === id)
    if (moveIndex === -1) {
      return false
    }
    movies.splice(moveIndex, 1)
    return (movies[moveIndex])
  }

  static async update ({ id, update }) {
    const moveIndex = movies.findIndex((movie) => movie.id === id)
    if (moveIndex === -1) {
      return false
    }
    const updateMOvie = {
      ...movies[moveIndex],
      ...update
    }
    movies[moveIndex] = updateMOvie
    return updateMOvie
  }
}

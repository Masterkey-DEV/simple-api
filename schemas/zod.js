import Z  from 'zod'

const schema = Z.object({
  title: Z.string({
    invalid_type_error: 'movie must be a string',
    required_error: 'movie title is required.'
  }),
  year: Z.number().int().positive().min(1900).max(2024),
  duration: Z.number().positive(),
  director: Z.string(),
  poster: Z.string().url({
    message: 'poster must be a valid url'
  }),
  genre: Z.array(Z.enum(['action', 'adventure', 'horror', 'drama', 'fantasy', 'thriller', 'comedy'], {
    required_error: 'genre is required',
    invalid_type_error: 'genre must be an array of strings'
  })),
  rate: Z.number().min(0).max(10).default(5)
})

export function validator (object) {
  return schema.safeParse(object)
}

export function partialValidator (object) {
  return schema.partial().safeParse(object)
}



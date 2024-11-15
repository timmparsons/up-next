import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.EXPO_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const NUM = Math.floor(Math.random() * 20) + 1;

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'MovieOrTVShow',
  description: 'A JSON schema for a movie or TV show returned by an AI.',
  type: 'object',
  properties: {
    title: { type: 'string', description: 'The title of the movie or TV show.' },
    type: {
      type: 'string',
      enum: ['movie', 'tv_show'],
      description: 'The type of content (movie or TV show).',
    },
    release_year: { type: 'integer', description: 'The release year.', minimum: 1878 },
    genre: {
      type: 'array',
      description: 'Genres associated with the movie or TV show.',
      items: { type: 'string' },
    },
    rating: { type: 'number', description: 'Average rating.', minimum: 0, maximum: 10 },
    cast: {
      type: 'array',
      description: 'List of main cast members.',
      items: {
        type: 'object',
        properties: { name: { type: 'string' }, character_name: { type: 'string' } },
        required: ['name'],
      },
    },
    director: { type: 'string', description: 'The director.' },
    seasons: { type: 'integer', description: 'Seasons if applicable.', minimum: 1 },
    episodes: { type: 'integer', description: 'Episodes if applicable.', minimum: 1 },
    description: { type: 'string', description: 'Synopsis.' },
    languages: { type: 'array', items: { type: 'string' } },
    runtime: { type: 'integer', description: 'Runtime in minutes.', minimum: 1 },
    image_url: { type: 'string', description: 'URL to image.', format: 'uri' },
    provider: { type: 'string', description: 'Provider showing show' },
  },
  required: ['title', 'type', 'release_year', 'genre', 'description'],
  additionalProperties: false,
};

export async function getMovies() {
  const models = ['llama3-8b-8192', 'gemma2-9b-it', 'llama-3.2-11b-text-preview', 'gemma-7b-it'];

  for (const model of models) {
    try {
      const chat_completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are a movie database that outputs movies in JSON format.`,
          },
          {
            role: 'user',
            content: `Fetch 12 random movies and tv shows from the past ${NUM} years using a ${schema} like above ensuring each item fully follows the provided schema including 'title', 'description', 'genres', 'release_year', 'poster_url' and 'provider' fields and a field called 'type' that shows whether it's tv or movie. Make sure it always returns the movies or tv shows in an array called results. Make sure it is always random and new ones are shown each time.`,
          },
        ],
        model,
        temperature: 0,
        stream: false,
        response_format: { type: 'json_object' },
      });
      // If successful, return the result
      return chat_completion.choices[0]?.message?.content;
    } catch (error) {
      console.error(`Model ${model} failed:`, error);
    }
  }
  // If no models were successful, handle the failure case
  throw new Error('All models failed to fetch movie data.');
}

export async function getGroqMovies() {
  try {
    const movies = await getMovies();
    console.log('Movies data from getMovie:', movies);
    return movies;
  } catch (error) {
    console.error('Error in getGroqMovies:', error.message, error.stack);
    return [];
  }
}

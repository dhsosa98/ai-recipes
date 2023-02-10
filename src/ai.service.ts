const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY || ''
const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate'

export async function giveMeARecipe(input: string) {
    const data = {
      model: 'command-xlarge-nightly',
      prompt: `Give me a full cooking recipe idea using only this ingredients "${input}". Limited by 700 words. --`,
      max_tokens: 700,
      temperature: 0.2,
      k: 0,
      p: 0.75,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: ['--'],
      return_likelihoods: 'NONE'
    }
  
    const response = await fetch(COHERE_API_GENERATE_URL, {
      method: 'POST',
      headers: {
        Authorization: `BEARER ${COHERE_API_KEY}`,
        "Content-Type": 'application/json',
        "Cohere-Version": '2022-12-06'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
  
    const { text } = response.generations[0]
    return text
  }
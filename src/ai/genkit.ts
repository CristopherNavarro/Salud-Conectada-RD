import {genkit} from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { mistral } from '@genkit-ai/mistral';

export const ai = genkit({
  plugins: [ googleAI(), mistral({ apiKey: 'LwEJv7Yfhk8yO29XH8DamRjvHS4RwnLz' })],
  model: 'mistral/mistral-large-latest',
});
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {mistral} from 'genkitx-mistral';

export const ai = genkit({
  plugins: [googleAI(), mistral()],
});
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-4RN68eIs6FCtoA7W8Q3PMnF7",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

type Data = {
  message: string | undefined
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 50,
    temperature: 0,
  });
  if (response.data) {
    if (response.data.choices) {
      res.status(200).json({ message: response.data.choices[0].text })
    }
  }
  console.log(response.data);
  res.status(200).json({ message: 'John Doe' })
}

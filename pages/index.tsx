import type { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent, useState } from 'react'

const Home: NextPage = () => {
  // const response = await openai.listEngines();
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({message})
      })
      .then((res) => res.json())
      .then((data) => setResponse(data.message))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 max-w-6xl mx-auto text-gray-700">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-5xl font-bold">
          AI playground
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col mt-20 w-1/3">
          <textarea className="border border-gray-400 p-4" placeholder="Ask AI to write something back..." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          <button className="my-4 mx-auto px-6 py-2 rounded-md bg-slate-300" type="submit">Submit</button>
        </form>
        {response && <div className="border-slate-300 max-w-xl mt-4 pt-4 border-t"><p><strong>Response:</strong><br /> {response}</p></div>}
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t text-sm">
        <p>OpenAI API Playground. Model: text-davinci-003
          <a
            className="flex items-center justify-center gap-2"
            href="https://santai.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>mw</strong>
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Home

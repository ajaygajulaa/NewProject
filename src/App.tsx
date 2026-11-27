import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1>React + Vite</h1>
      <p>A small starting point for your next app.</p>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Count: {count}
      </button>
      <p>Edit <code>src/App.tsx</code> to get started.</p>
    </main>
  )
}

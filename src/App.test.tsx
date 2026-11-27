// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import App from './App'

afterEach(cleanup)

test('renders the starter page and increments the counter', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: 'React + Vite' })).toBeTruthy()
  const button = screen.getByRole('button', { name: 'Count: 0' })
  fireEvent.click(button)
  expect(screen.getByRole('button', { name: 'Count: 1' })).toBeTruthy()
})

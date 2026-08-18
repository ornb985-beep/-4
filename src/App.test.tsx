import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

function remainingText() {
  return screen.getByText(/tasks? remaining/i).textContent
}

describe('Task Board', () => {
  it('renders the two seeded tasks and initial remaining count', () => {
    render(<App />)
    expect(
      screen.getByText('Set up the Cloud Agent environment'),
    ).toBeInTheDocument()
    expect(screen.getByText('Run the app end to end')).toBeInTheDocument()
    expect(remainingText()).toBe('1 task remaining')
  })

  it('adds a task and increments the remaining count', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(
      screen.getByPlaceholderText('What needs to be done?'),
      'Demonstrate the environment works',
    )
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(
      screen.getByText('Demonstrate the environment works'),
    ).toBeInTheDocument()
    expect(remainingText()).toBe('2 tasks remaining')
  })

  it('toggles a task done, applies strikethrough, and decrements the count', async () => {
    const user = userEvent.setup()
    render(<App />)

    const activeTask = screen
      .getByText('Run the app end to end')
      .closest('li') as HTMLElement
    const checkbox = within(activeTask).getByRole('checkbox')

    expect(checkbox).not.toBeChecked()
    await user.click(checkbox)

    expect(checkbox).toBeChecked()
    expect(activeTask).toHaveClass('is-done')
    expect(remainingText()).toBe('0 tasks remaining')
  })

  it('filters tasks by Active and Done', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('tab', { name: 'Active' }))
    expect(screen.getByText('Run the app end to end')).toBeInTheDocument()
    expect(
      screen.queryByText('Set up the Cloud Agent environment'),
    ).not.toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: 'Done' }))
    expect(
      screen.getByText('Set up the Cloud Agent environment'),
    ).toBeInTheDocument()
    expect(screen.queryByText('Run the app end to end')).not.toBeInTheDocument()
  })

  it('deletes a task', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole('button', { name: 'Delete Run the app end to end' }),
    )
    expect(
      screen.queryByText('Run the app end to end'),
    ).not.toBeInTheDocument()
  })
})

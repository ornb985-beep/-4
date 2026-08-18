import { useMemo, useState } from 'react'
import './App.css'

type Filter = 'all' | 'active' | 'done'

interface Task {
  id: number
  title: string
  done: boolean
}

const initialTasks: Task[] = [
  { id: 1, title: 'Set up the Cloud Agent environment', done: true },
  { id: 2, title: 'Run the app end to end', done: false },
]

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [draft, setDraft] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const remaining = tasks.filter((t) => !t.done).length

  const visibleTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((t) => !t.done)
      case 'done':
        return tasks.filter((t) => t.done)
      default:
        return tasks
    }
  }, [tasks, filter])

  function addTask() {
    const title = draft.trim()
    if (!title) return
    setTasks((prev) => {
      const id = prev.reduce((max, t) => Math.max(max, t.id), 0) + 1
      return [...prev, { id, title, done: false }]
    })
    setDraft('')
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )
  }

  function removeTask(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <main className="app">
      <section className="card">
        <header className="card__header">
          <h1>Task Board</h1>
          <p className="subtitle">
            {remaining} task{remaining === 1 ? '' : 's'} remaining
          </p>
        </header>

        <div className="composer">
          <input
            aria-label="New task"
            className="composer__input"
            placeholder="What needs to be done?"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTask()
            }}
          />
          <button className="composer__button" onClick={addTask}>
            Add
          </button>
        </div>

        <div className="filters" role="tablist" aria-label="Filter tasks">
          {(['all', 'active', 'done'] as const).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`filters__button ${filter === f ? 'is-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <ul className="tasks">
          {visibleTasks.length === 0 && (
            <li className="tasks__empty">Nothing here yet.</li>
          )}
          {visibleTasks.map((task) => (
            <li key={task.id} className={`task ${task.done ? 'is-done' : ''}`}>
              <label className="task__label">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task__title">{task.title}</span>
              </label>
              <button
                className="task__delete"
                aria-label={`Delete ${task.title}`}
                onClick={() => removeTask(task.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

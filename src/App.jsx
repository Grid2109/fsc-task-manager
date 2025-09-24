import { Tasks } from './components/Tasks'

export function App() {
  const name = 'John Doe'
  console.log(`Hello, ${name}!`)
  return (
    <>
      <Tasks />
    </>
  )
}

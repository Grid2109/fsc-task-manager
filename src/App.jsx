import { Sidebar } from './components/Sidebar'
import { Tasks } from './components/Tasks'
import { Toaster } from 'sonner'

export function App() {
  return (
    <div className='flex'>
      <Toaster
        toastOptions={{
          style: {
            color: '#35383E',
          },
        }}
      />
      <Sidebar />
      <Tasks />
    </div>
  )
}

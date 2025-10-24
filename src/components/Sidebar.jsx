import { HomeIcon, TaskIcon } from '../assets/icons'
import { SidebarButton } from './SidebarButton'

export const Sidebar = () => {
  return (
    <div className='h-screen w-72 bg-white'>
      <div className='space-y-4 px-8 py-6'>
        <h1 className='text-xl font-semibold text-[#00ADB5]'>Task Manager</h1>
        <p>
          Um simples{' '}
          <span className='text-[#00ADB5]'>Organizador de tarefas.</span>
        </p>
      </div>

      <div className='flex flex-col gap-2 p-2'>
        <SidebarButton variant='unselected'>
          <HomeIcon />
          Início
        </SidebarButton>
        <SidebarButton variant='selected'>
          <TaskIcon />
          Minhas tarefas
        </SidebarButton>
      </div>
    </div>
  )
}

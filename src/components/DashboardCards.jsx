import { LoaderIcon, TaskIcon, Tasks2Icon } from '../assets/icons'
import { DashboardCard } from '../components/DashboardCard'
import { useGetTasks } from '../hooks/data/use-get-tasks'

export const DashboardCards = () => {
  const { data: tasks } = useGetTasks()

  const notStartedTasks = tasks?.filter(
    (task) => task.status === 'not_started'
  ).length

  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in_progress'
  ).length
  const completedTasks = tasks?.filter((task) => task.status === 'done').length

  return (
    <div className='grid grid-cols-4 gap-9'>
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={tasks?.length}
        secondaryText='Tarefas totais'
      />
      <DashboardCard
        icon={<LoaderIcon />}
        mainText={notStartedTasks}
        secondaryText='Tarefas não iniciadas'
      />
      <DashboardCard
        icon={<LoaderIcon />}
        mainText={inProgressTasks}
        secondaryText='Tarefas em andamento'
      />
      <DashboardCard
        icon={<TaskIcon />}
        mainText={completedTasks}
        secondaryText='Tarefas concluídas'
      />
    </div>
  )
}

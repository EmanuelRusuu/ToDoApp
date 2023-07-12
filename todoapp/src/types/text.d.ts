import type moment from 'moment'

export type TodoType = {
  title: string
  text: string
  priority: tuple
  isPriorityChange: boolean
  isChecked: boolean
  createdAt: moment
  isEditing: boolean
  id: number
}

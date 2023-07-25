import type moment from 'moment'

export type TodoType = {
  _id?: string
  userId: string
  title: string
  text: string
  priority: tuple
  isPriorityChange: boolean
  isChecked: boolean
  createdAt: moment
  isEditing: boolean
}

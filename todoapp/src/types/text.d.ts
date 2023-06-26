import type moment from 'moment'

export type TodoType = {
  title: string
  text: string
  isTextEdit: boolean
  priority: tuple
  isPriorityChange: boolean
  isStatus: boolean
  createdAt: moment
  isEditing: boolean
}

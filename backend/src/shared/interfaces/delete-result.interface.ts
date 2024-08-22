import { DeleteResult as Result } from 'mongodb'

export interface DeleteResult {
  raw: Result
  affected?: number
  generatedMaps: any
}


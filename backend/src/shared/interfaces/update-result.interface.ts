import { UpdateResult as Result } from 'mongodb'

export interface UpdateResult {
  raw: Result
  affected?: number
  generatedMaps: any
}

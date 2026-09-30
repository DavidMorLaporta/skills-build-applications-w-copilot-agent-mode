import { Router } from 'express'
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js'

const router = Router()

router.get('/users/', async (_request, response) => {
  const users = await UserModel.find().select('-__v').lean().exec()
  response.json(users)
})

router.get('/teams/', async (_request, response) => {
  const teams = await TeamModel.find().select('-__v').lean().exec()
  response.json(teams)
})

router.get('/activities/', async (_request, response) => {
  const activities = await ActivityModel.find()
    .sort({ performedAt: -1 })
    .select('-__v')
    .lean()
    .exec()
  response.json(activities)
})

router.get('/leaderboard/', async (_request, response) => {
  const entries = await LeaderboardModel.find()
    .sort({ rank: 1 })
    .select('-__v')
    .lean()
    .exec()
  response.json(entries)
})

router.get('/workouts/', async (_request, response) => {
  const workouts = await WorkoutModel.find().select('-__v').lean().exec()
  response.json(workouts)
})

export default router

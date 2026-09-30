import mongoose from 'mongoose'
import { connectDatabase } from '../config/database.js'
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js'

/**
 * Seed the octofit_db database with test data.
 * This script is safe to rerun: it upserts records by stable identifiers.
 */
async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase()

    const sampleUsers = [
      { username: 'maya-chen', email: 'maya.chen@example.com', displayName: 'Maya Chen', points: 1420, team: 'Trail Blazers' },
      { username: 'liam-patel', email: 'liam.patel@example.com', displayName: 'Liam Patel', points: 1285, team: 'Trail Blazers' },
      { username: 'sofia-garcia', email: 'sofia.garcia@example.com', displayName: 'Sofia Garcia', points: 1560, team: 'City Sprinters' },
      { username: 'noah-williams', email: 'noah.williams@example.com', displayName: 'Noah Williams', points: 1175, team: 'City Sprinters' },
    ]

    for (const user of sampleUsers) {
      await UserModel.updateOne(
        { username: user.username },
        {
          $set: {
            email: user.email,
            displayName: user.displayName,
            points: user.points,
          },
        },
        { upsert: true, runValidators: true },
      ).exec()
    }

    const sampleTeams = [
      { name: 'Trail Blazers', description: 'A friendly team focused on outdoor running and hiking.', members: ['maya-chen', 'liam-patel'] },
      { name: 'City Sprinters', description: 'A community chasing consistency, speed, and personal bests.', members: ['sofia-garcia', 'noah-williams'] },
    ]

    const teamIds = new Map<string, mongoose.Types.ObjectId>()
    const userIds = new Map<string, mongoose.Types.ObjectId>()

    for (const user of sampleUsers) {
      const record = await UserModel.findOne({ username: user.username }).select('_id').exec()
      if (!record) {
        throw new Error(`Unable to retrieve seeded user ${user.username}`)
      }
      userIds.set(user.username, record._id)
    }

    for (const team of sampleTeams) {
      const memberIds = team.members.map((username) => {
        const userId = userIds.get(username)
        if (!userId) {
          throw new Error(`Unable to resolve team member ${username}`)
        }
        return userId
      })
      const record = await TeamModel.findOneAndUpdate(
        { name: team.name },
        {
          $set: { description: team.description },
          $addToSet: { memberIds: { $each: memberIds } },
        },
        { upsert: true, returnDocument: 'after', runValidators: true },
      ).exec()
      if (!record) {
        throw new Error(`Unable to retrieve seeded team ${team.name}`)
      }
      teamIds.set(team.name, record._id)
    }

    for (const user of sampleUsers) {
      const teamId = teamIds.get(user.team)
      if (!teamId) {
        throw new Error(`Unable to resolve team ${user.team}`)
      }
      await UserModel.updateOne({ username: user.username }, { $set: { teamId } }).exec()
    }

    const activities = [
      { username: 'maya-chen', type: 'run', durationMinutes: 42, distanceKm: 6.2, calories: 390, performedAt: new Date('2026-09-28T07:30:00Z') },
      { username: 'maya-chen', type: 'strength', durationMinutes: 35, calories: 210, performedAt: new Date('2026-09-26T17:00:00Z') },
      { username: 'liam-patel', type: 'cycling', durationMinutes: 55, distanceKm: 18.5, calories: 460, performedAt: new Date('2026-09-28T08:00:00Z') },
      { username: 'sofia-garcia', type: 'run', durationMinutes: 31, distanceKm: 5.1, calories: 315, performedAt: new Date('2026-09-27T06:45:00Z') },
      { username: 'sofia-garcia', type: 'yoga', durationMinutes: 40, calories: 140, performedAt: new Date('2026-09-25T18:30:00Z') },
      { username: 'noah-williams', type: 'walk', durationMinutes: 48, distanceKm: 4.3, calories: 225, performedAt: new Date('2026-09-28T12:15:00Z') },
    ]

    for (const activity of activities) {
      const userId = userIds.get(activity.username)
      if (!userId) {
        throw new Error(`Unable to resolve activity user ${activity.username}`)
      }
      await ActivityModel.updateOne(
        { userId, type: activity.type, performedAt: activity.performedAt },
        { $set: { ...activity, userId } },
        { upsert: true, runValidators: true },
      ).exec()
    }

    const period = '2026-09'
    for (const [rank, user] of [...sampleUsers].sort((first, second) => second.points - first.points).entries()) {
      const userId = userIds.get(user.username)
      const teamId = teamIds.get(user.team)
      if (!userId || !teamId) {
        throw new Error(`Unable to resolve leaderboard references for ${user.username}`)
      }
      await LeaderboardModel.updateOne(
        { userId, period },
        { $set: { teamId, points: user.points, rank: rank + 1, period } },
        { upsert: true, runValidators: true },
      ).exec()
    }

    const workouts = [
      { title: 'Easy Endurance Run', description: 'Build aerobic fitness with a comfortable conversational-pace run.', difficulty: 'beginner' as const, durationMinutes: 30, targetActivities: ['run'] },
      { title: 'Full-Body Strength Circuit', description: 'A balanced circuit of bodyweight movements with controlled rest.', difficulty: 'intermediate' as const, durationMinutes: 35, targetActivities: ['strength'] },
      { title: 'Progressive Tempo Ride', description: 'A cycling session that gradually increases effort before cooling down.', difficulty: 'intermediate' as const, durationMinutes: 45, targetActivities: ['cycling'] },
      { title: 'Mobility and Recovery Flow', description: 'Gentle yoga and mobility work to support recovery and flexibility.', difficulty: 'beginner' as const, durationMinutes: 25, targetActivities: ['yoga', 'recovery'] },
    ]

    for (const workout of workouts) {
      await WorkoutModel.updateOne(
        { title: workout.title },
        { $set: workout },
        { upsert: true, runValidators: true },
      ).exec()
    }

    console.log('Database seeding complete: users, teams, activities, leaderboard, and workouts are ready.')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  } finally {
    await mongoose.disconnect()
  }
}

seedDatabase().catch(() => {
  process.exitCode = 1
})

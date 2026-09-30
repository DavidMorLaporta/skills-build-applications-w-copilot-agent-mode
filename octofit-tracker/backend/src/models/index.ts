import { model, Schema, Types } from 'mongoose'

interface User {
  username: string
  email: string
  displayName: string
  teamId?: Types.ObjectId
  points: number
}

interface Team {
  name: string
  description: string
  memberIds: Types.ObjectId[]
}

interface Activity {
  userId: Types.ObjectId
  type: string
  durationMinutes: number
  distanceKm?: number
  calories?: number
  performedAt: Date
}

interface LeaderboardEntry {
  userId: Types.ObjectId
  teamId?: Types.ObjectId
  points: number
  rank: number
  period: string
}

interface Workout {
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  durationMinutes: number
  targetActivities: string[]
}

export const UserModel = model<User>(
  'User',
  new Schema<User>({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0, min: 0 },
  }),
)

export const TeamModel = model<Team>(
  'Team',
  new Schema<Team>({
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  }),
)

export const ActivityModel = model<Activity>(
  'Activity',
  new Schema<Activity>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
    performedAt: { type: Date, default: Date.now },
  }),
)

export const LeaderboardModel = model<LeaderboardEntry>(
  'Leaderboard',
  new Schema<LeaderboardEntry>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, trim: true },
  }),
)

export const WorkoutModel = model<Workout>(
  'Workout',
  new Schema<Workout>({
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    targetActivities: [{ type: String, trim: true }],
  }),
)

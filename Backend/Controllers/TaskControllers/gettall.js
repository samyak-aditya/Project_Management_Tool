import Task from '../Models/task.js';
import moment from 'moment-timezone';

export async function getAll(req, res) {
  try {
    const userId = req.body.userId;

    // Get current time in Indian Standard Time (IST)
    const today = moment().tz('Asia/Kolkata');

    // Define start times for filtering tasks
    const startTimeOfToday = moment(today).startOf('day');
    const weekAgo = moment(today).subtract(7, 'days').startOf('day');
    const startOfMonth = moment(today).subtract(30, 'days').startOf('day');

    let filter = {};
    const typeOfFilter = req.query.typeOfFilter || 'thisWeek';

    switch (typeOfFilter) {
      case 'today':
        filter = {
          createdAt: {
            $gte: startTimeOfToday.toDate(),
            $lt: today.toDate(),
          },
        };
        break;

      case 'thisWeek':
        filter = {
          createdAt: {
            $gte: weekAgo.toDate(),
            $lt: today.toDate(),
          },
        };
        break;

      case 'thisMonth':
        filter = {
          createdAt: {
            $gte: startOfMonth.toDate(),
            $lt: today.toDate(),
          },
        };
        break;

      default:
        filter = {};
    }

    filter = {
      refUserId: userId,
      ...filter,
    };

    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

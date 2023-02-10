const { getStatistic } = require('../statistic/db');
const { aggregateMethod } = require('../db/methods');
const appConfig = require('../../config');
const { forkResult } = require('../db/schema');
const keys = {
  command_1: forkResult.command_1.name,
  command_2: forkResult.command_2.name,
  commandId_1: forkResult.commandId_1.name,
  commandId_2: forkResult.commandId_2.name,
  eventDate: forkResult.eventDate.name,
  created_at: forkResult.created_at.name,
  fork: forkResult.fork.name,
  eventId: forkResult.eventId.name,
  parseCount: forkResult.parseCount.name
};

async function getActualFork() {
  const stat = await getStatistic();
  const { parseCount } = stat;
  const collectionName = appConfig.collections.results.name;
  const pipline = createPipline(parseCount - 1);
  const result = await aggregateMethod.get(collectionName, pipline);
  return result;
}

function createPipline(parseCount) {
  const project = createProjectKeys();
  const pipline = [
    {
      $match: {
        parseCount: { $gte: parseCount },
        eventDate: { $gte: Date.now() }
      }
    },
    {
      $sort: {
        parseCount: -1
      }
    },
    {
      $group: {
        _id: {
          [keys.commandId_1]: `$${keys.commandId_1}`,
          [keys.commandId_2]: `$${keys.commandId_2}`
        },
        object: {
          $first: '$$ROOT'
        }
      }
    },
    {
      $project: project
    }
  ];
  return pipline;
}
function createProjectKeys() {
  const project = {
    _id: '$object._id'
  };

  Object.keys(keys).forEach((key) => {
    const value = keys[key];
    const str = `$object.${value}`;
    project[value] = str;
  });
  return project;
}
module.exports = getActualFork;
// $project: {
//   _id: '$object._id',
//   [keys.command_1]: `$object.${keys.command_1}`,
//   [keys.command_2]: `$object.${keys.command_2}`,
//   [keys.parseCount]: `$object.${keys.parseCount}`,
//   [keys.fork]: `$object.${keys.fork}`
// }

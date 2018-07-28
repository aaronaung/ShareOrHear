// Interface with MySQL using Soh methods
class Soh {
  constructor(connection) {
    this.connection = connection;
  }

  // === Execute sql statement and return structured & parsed mysql response ===
  _execQuery(statement, sqlArg) {
    let response = new Promise(resolve => {
      this.connection.query(statement, sqlArg, (err, result) => {
        if (err) {
          resolve({ status: "error", payload: err.sqlMessage });
        } else {
          resolve({ status: "success", payload: result[0] });
        }
      });
    });
    return response;
  }

  // === (Core API methods) : Returns a promise to be resolved then dispatched to client ===
  async getStorybyCred({ storyId, storyCode }) {
    let sql = `select * from Stories where storyId=${storyId} and code='${storyCode}'`;
    return await this._execQuery(sql);
  }

  async insertStory(story) {
    let sproc = `call usp_InsertStory (?)`;
    return await this._execQuery(sproc, story);
  }

  async getStoriesbyTags({ tags }) {
    let sproc = `call usp_GetStories (?)`;
    return await this._execQuery(sproc, tags);
  }

  getStorybyId(id) {
    let sql = `select * from stories where id=${id}`;
    return this._executeQuery(sql);
  }

  // === (Parsers/Processors) : Returns parsed data from MySQL response on success ===
  // s_insertStory(result) {
  //   return result[0].id;
  // }

  // s_getTopStoriesbyTags(result) {
  //   // returns the ids of the top stories (scored by number of matching tags)
  //   let flatten = arr => arr.reduce((acc, curr) => acc.concat(curr), []);
  //   let ids = flatten(result.map(pair => Object.values(pair)[1].split(","))); // flattened ids
  //   let scoreMap = {};
  //   let highestScore = 0;
  //   let topStories = [];
  //   ids.forEach(id => {
  //     if (!scoreMap[id]) scoreMap[id] = 0;
  //     if (scoreMap[id] + 1 > highestScore) {
  //       highestScore = scoreMap[id] + 1;
  //       topStories = [];
  //       topStories.push(id);
  //     } else if (scoreMap[id] + 1 == highestScore) {
  //       topStories.push(id);
  //     }
  //     scoreMap[id] += 1;
  //   });
  //   return topStories;
  // }

  // // === (Parsers/Processors) : Return customized MySQL error messages on err ===
  // e_sample(err) {
  //   // return err.sqlMessage;
  // }
}

module.exports = Soh;

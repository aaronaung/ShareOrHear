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

  async insertStory({ title, story, imageLink, siteLink, videoLink, tags, code }) {
    let sproc = `call usp_InsertStory (?)`;
    return await this._execQuery(sproc, [[title, story, imageLink, siteLink, videoLink, tags, code]]);
  }

  async getStoriesbyTags({ tags }) {
    let sproc = `call usp_GetStories (?)`;
    return await this._execQuery(sproc, tags);
  }

  async editStory(story) {
    let sproc = `call usp_EditStory (?)`;
    return await this._execQuery(sproc, [Object.values(story)]);
  }
}

module.exports = Soh;

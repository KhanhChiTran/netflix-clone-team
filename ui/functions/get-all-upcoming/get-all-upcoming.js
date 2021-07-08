// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const db = require("../mongo/mongoConfig");
const { Films } = require("../mongo/models");
const handler = async (event) => {
  try {
    db.connect();
    const data = await Films.find({
      rating: { $lt: 6 },
      vote_count: { $lt: 500 }
    });
    db.close();
    return {
      statusCode: 200,
      body: JSON.stringify({ data })
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (error) {
    db.close();
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };

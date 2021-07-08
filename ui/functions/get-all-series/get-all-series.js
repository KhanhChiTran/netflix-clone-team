// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const db = require("../mongo/mongoConfig");
const { Series } = require("../mongo/models");
const handler = async (event) => {
  try {
    db.connect();
    const data = await Series.find({});
    db.close();
    return {
      statusCode: 200,
      body: JSON.stringify({ data })
      // res.status(200).json({message : 'hello'})
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

const ENV = require('./config/env');
const axios = require('axios');

const recastAuthHeaders = {
  Authorization: `Token ${ENV.recastApi.token}`
};

/**
 * Return the nested property of an object, or null if error
 * @param  {Array of string} path
 * @param  {Object} baseObject
 * @return {[Any, null]}
 */
const getNestedProperty = (path, baseObject) => {
  return path.reduce((currentObject, currentProperty) => {
    return (currentObject && currentObject[currentProperty]) ? currentObject[currentProperty] : null;
  }, baseObject);
};

// Format the intents from the API to a clean array of intents ([String])
const getCleanIntents = (intents) => {
  let cleanArray = [];

  intents.forEach((intent) => {
    if (intent.slug) {
      cleanArray.push(intent.slug);
    };
  });

  return cleanArray;
};

module.exports = {
   // Get an array of intents (String) from an input (String)
  getIntents: async (userInput) => {
    const config = {
      method: 'post',
      url: `${ ENV.recastApi.baseUrl }request`,
      responseType: 'json',
      headers: recastAuthHeaders,
      data: {
        text: userInput
      }
    };
    
    const res = await axios(config);
    const intents = getNestedProperty(['data', 'results', 'intents'], res);
    
    if (!intents || !Array.isArray(intents)) {
      throw Error('API ERROR: Couldn\'t parse Recast intents');
    };

    return getCleanIntents(intents);
  },

  // Get a random full name
  getRandomName: async (userInput) => {
    let res = await axios.get(ENV.randomUserApi.baseUrl);
    let nameData = getNestedProperty(['data', 'results', 0, 'name'], res);
    let firstName = getNestedProperty(['first'], nameData);
    let lastName = getNestedProperty(['last'], nameData);

    return `${firstName} ${lastName}`;
  }
}
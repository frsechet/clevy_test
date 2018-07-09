const ENV = require('../config/env');
const apiClient = require('../api-client');

module.exports = {
  // Return a formatted answer (String)
  formatAnswer: async (intent, answer) => {
    if (intent === 'ask-creator') {
      const randomName = await apiClient.getRandomName();
      return answer.replace('${name}', randomName);
    };
    
    return answer;
  },
  
  // Return the first intent known (String or null)
  getFirstMatchingIntent: (intents) => {
    for (var i = 0; i < intents.length; i++) {
      const answer = intentsUtil.getAnswerForIntent(intents[i]);
      if (answer) {
        return intents[i];
      };
    };
    
    return null;
  },

  // Return the answer (String or null)
  getAnswerForIntent: (intent) => {
    if (intent) {
      for (var i = 0; i < ENV.answers.length; i++) {
        let answerObj = ENV.answers[i];
        if (answerObj.intent === intent) {
          return answerObj.answer;
        };
      }
    }
    
    return null;
  }
};
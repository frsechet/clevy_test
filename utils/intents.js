const ENV = require('../config/env');
const apiClient = require('../api-client');

// Check is called utils everywhere
const intentsUtil = {
  formatAnswer: async (intent, answer) => {
    if (intent === 'ask-creator') {
      const randomName = await apiClient.getRandomName();
      return answer.replace('${name}', randomName);
    }
    
    return answer;
  },
  
  /**
   * The first intent to find a match in the local answers db return the answer
   * If nothing matches, returns null
   */
  getFirstMatchingIntent: (intents) => {
    // Can't use forEach to exit when solution is found
    for (var i = 0; i < intents.length; i++) {
      const answer = intentsUtil.getAnswerForIntent(intents[i]);
      if (answer) {
        return intents[i];
      };
    };
    
    return null;
  },

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
}

module.exports = intentsUtil;
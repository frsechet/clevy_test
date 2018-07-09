const fs = require('fs');

const encoding = 'utf8'
const ENV = {
  answersSeparator: ';',
  // APIs
  recastApi: {
    baseUrl: 'https://api.recast.ai/v2/',
  },
  randomUserApi: {
    baseUrl: 'https://randomuser.me/api/'
  },
};

try {
  /**
   * Cache answers from disk synchronously, with format:
   * { intent: '', answer: '' }
   */
  const answersData = fs.readFileSync('./config/answers.csv', encoding);
  const answersArray = answersData.split('\n');
  let validAnswers = [];
  
  answersArray.forEach((answerLine) => {
    const answerSplited = answerLine.split(';');
    
    if (answerSplited.length >= 2) {
      let intent = answerSplited[0];
      let answer = answerSplited[1];
      
      if (intent.length > 0 && answer.length > 0) {
        validAnswers.push({ intent, answer });
      };
    }
  });
  
  ENV.answers = validAnswers;
  
  // Cache API keys from disk synchronously
  ENV.recastApi.token = fs.readFileSync('./config/recast.key', encoding);
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error('answers.csv or API Tokens files are missing');
  }
  console.error(error);
  process.exit();
};

module.exports = ENV;
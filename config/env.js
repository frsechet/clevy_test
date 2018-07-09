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
    const separatorPosition = answerLine.indexOf(';');
    
    if (separatorPosition > -1) {
      let intent = answerLine.substring(0, separatorPosition);
      let answer = answerLine.substring(separatorPosition + 1, answerLine.length);
      
      if (intent.length > 0 && answer.length > 0) {
        validAnswers.push({
          intent: intent,
          answer: answer
        });
      };
    };
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
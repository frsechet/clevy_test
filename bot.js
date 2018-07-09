const apiClient = require('./api-client');
const logger = require('./utils/logger');
const checker = require('./utils/checker');
const intentsUtil = require('./utils/intents');

if (process.argv.length !== 3) {
  console.error('This bot requires exactly 1 argument, for exemple try:\nnode bot.js "are you a bot?"');
  process.exit();
}

const userInput = process.argv[2];

const runBot = async () => {
  try {
    // Get intents ordered by probability
    const orderedIntents = await apiClient.getIntents(userInput);
    const intent = intentsUtil.getFirstMatchingIntent(orderedIntents);
    const answer = intentsUtil.getAnswerForIntent(intent);
    const formattedAnswer = await intentsUtil.formatAnswer(intent, answer);

    if (formattedAnswer) {
      console.log(formattedAnswer);
    } else {
      console.log('I don\'t understand your question, try another one ?');
    }

    // Logging all interactions (even with no answer)
    await logger.saveInteraction(userInput, formattedAnswer);
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

if (checker.inputIsValid(userInput)) {
  runBot();
} else {
  console.error('The query must contain between 1 and 511 characters');
}

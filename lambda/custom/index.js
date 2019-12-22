// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      const speechText = 'スマートじゃないホームへようこそ。';
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
};
const LightOnIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'LightOnIntent';
    },
    handle(handlerInput) {
      const speechText = 'はい、つけます。';
      return handlerInput.responseBuilder
        .speak(speechText)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
    }
};
const LightOffIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'LightOffIntent';
  },
  handle(handlerInput) {
    const speechText = 'はい、消します。';
    return handlerInput.responseBuilder
      .speak(speechText)
      //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
      .getResponse();
  }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
          || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
   handle(handlerInput) {
      const speechText = 'さようなら!';
      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
      // Any cleanup logic goes here.
      return handlerInput.responseBuilder.getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`~~~~ Error handled: ${error.message}`);
      const speechText = `すいません、聞き取れませんでした。`;

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    LightOnIntentHandler,
    LightOffIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
  .addErrorHandlers(
    ErrorHandler)
  .lambda();
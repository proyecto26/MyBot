<h1 align="center">
  <img src="./img/mybot.png"/><br>
  NodeJS(Express) + Swagger + Multi-Language
</h1>

## Intro ☕
MyBot can be easily configured in any Express project by adding the [bot](src/nodejs/bot) folder, installing dependencies and initializing it 🤘
### Presentations: 
  - [Bot Framework - Global Azure Bootcamp](https://slides.com/juandavidnicholls/bot-framework)
  - [My first Multi-language Bot!](https://slides.com/juandavidnicholls/my-bot)

## Installation ⏯
Do you want to see this template in action? 💻
- Download the code [here](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/proyecto26/MyBot/tree/master/src/nodejs)
- To run the project execute the commands:
```
npm install
npm start
```

And remember install the following tools to debug your bot locally:
- [Bot Framework Emulator](https://github.com/Microsoft/BotFramework-Emulator)
- [ngrok](https://ngrok.com/download) (Required to connect to a bot hosted remotely)

![MyBot](img/bot_nodejs.png)

More examples with **NodeJS**:
- [BotBuilder](https://github.com/Microsoft/BotBuilder/tree/master/Node/examples)
- [BotBuilder-Samples](https://github.com/Microsoft/BotBuilder-Samples/tree/master/Node)

## Bots History 🌎
- 1960: ELIZA
- 1970: PARRY
- 1980: Graphic interface
- 1990: Search engines
- 2000: Social/App stores
- 2010: Bots and agents, human Interaction/Experience

## Chatbots types
- **Utilities:** It fulfills a function for the users and is measured according to the effectiveness of the answers.
- **Social:** Success is measured according to the duration and level of user satisfaction, it is also possible to assess the level of satisfaction through APIs to recognize the level of emotion of users.
- **Assistants (Cortana, Siri, etc):** Acts as a facilitator, usually comes integrated with the Operating System. Main features:
  * Utilities and social capacities
  * Continuous relationship with the user
  * Manage system functions

## Communication flow
List the functions offered by the bot and describe a step by step for its execution:
- Task
- Objective
- Motivation of the user
- Steps
- Forecasts

## Experience components
- Learning and memory
- Perception and sense
- Personality (Intelligence)
- Logic and reason
- Accessibility
- Meaning and tone of text
- Cards
- Images
- Emojis
- Response time
- Conversational branch

## Design
- Inclusive design (Design for all types of public)
- UX (Avatar)
- Character with personality
- Define the devices and channels to support (Cortana, Email, Facebook, etc)
- Form flow (conversation follow-up, validate the data)
- Prevent redirections

## Lifecycle

![Bot Lifecycle](img/bot_lifecycle.png)

# Bot Framework 🤖
Open Source Framework to create and connect bots (Cross channel, AI and Up-to-Date resources).
![Bot Framework](img/bot_framework.png)

## Bot Connector Service 
Integrate the bot with different channels as Slack, Skype, Messenger, SMS, etc.
![Bot Connector](img/bot_connector.png)

The **Bot Connector** can connect with the intelligence services and implement other functionalities such as:
- Ability to store the state of the conversation.
- Translate services.
- Telemetry. Information about the service is collected, such as the number of requests, messages that have failed, etc.

## Bot Builder
SDKs for .NET, NodeJS or we can use REST APIs to create and debug bots. It also includes the **Bot Framework Emulator** to test our bots and the Channel Inspector to preview the user experience of our bot on different channels.
Integrate external services and Manage the conversation using [LUIS](https://www.luis.ai/welcome) (Language Understanding Intelligent Service). 


# Microsoft Cognitive Services 🌐
Set of APIs to create smart applications.

## Vision 👀
Image-processing algorithms to smartly identify, caption and moderate your pictures.
- Computer Vision (Images)
- Emotion
- Content Moderator
- Face
- Video

## Speech 💬
Convert spoken audio into text, use voice for verification, or add speaker recognition to your app.
- Custom Speech Service (CRIS)
- Speaker Recognition
- Speech
- Translator

## Language 🤝
Allow your apps to process natural language with pre-built scripts, evaluate sentiment and learn how to recognize what users want.
- Bing Spell Check
- Language Understanding
- Linguistic Analysis
- Text Analytics
- Web Language Model

### Videos 📹

* [Introduction to LUIS](https://aka.ms/luis-intro-video)
* [Advanced learning with LUIS](https://www.youtube.com/watch?v=39L0Gv2EcSk)
* [Channel 9 Deep Dive into LUIS and Chatbots](https://channel9.msdn.com/Blogs/MVP-Azure/Cognitive-Services-Episode-3-Deep-dive-into-LUIS-and-Chatbots)

### To Learn
- [Plan your LUIS app](https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/plan-your-app)
- [Use prebuilt domains in LUIS apps](https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/luis-how-to-use-prebuilt-domains)
- [Create your first LUIS app](https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/luis-get-started-create-app)
- [Manage intents](https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/add-intents)
- [Add utterances](https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/add-example-utterances)
- [Entities in LUIS](https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/luis-concept-entity-types) and [Prebuilt entities](https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/pre-builtentities)
- [Manage entities](https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/add-entities)
- [Improve prediction accuracy using features](https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/add-features)
- [Test your LUIS app](https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/train-test)
- [Use active learning](https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/label-suggested-utterances)
- [Publish your trained app](https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/publishapp)
- [LUIS Samples](https://github.com/Microsoft/LUIS-Samples)

## Knowledge 📖
Map complex information and data in order to solve tasks such as intelligent recommendations and semantic search.
- Academic Knowledge
- Entity Linking
- Knowledge Exploration
- Recommendations
- QnA Maker

## Search 🔎
Add Bing Search APIs to your apps and harness the ability to comb billions of webpages, images, videos, and news with a single API call.
- Bing Autosuggest
- Bing Image Search
- Bing News Search
- Bing Video Search
- Bing Web Search

# [QnA Maker](https://qnamaker.ai/) 👷
A free and easy-to-use REST API based on artificial intelligence to respond to users' questions in a natural way through an optimized learning logic (Machine Learning). It is a question and answer service with a graphical interface that allows it to be easy to administer.


<details>
 <summary>.NET Example</summary>

```csharp
[Serializable]
public class QnADialog : QnAMakerDialog {

  public QnADialog() : 
  base(new QnAMakerService(new QnAMakerAttribute("subscriptionKey", "knowledgeId", "answer not found", 0.5)))
  {
  }

  protected override async Task RespondFromQnAMakerResultAsync(IDialogContext, IMessageActivity message, QnAMakerResult result)
  {
    Activity response = ((Activity)context.Activity).CreateReply();

    var firstAnswer = result.Answers.FirstOrDefault()?.Answer;
    var data = firstAnswer.Split("---");

    if(data.Length == 1) {
      return await context.PostAsync(firstAnswer);
    }

    //Example to get data with a separator
    var title = data[0];
    var description = data[1];
    var url = data[2];
    var image = data[3];

    CustomCard card = new CustomCard 
    { 
      Title = title, SubTitle = description
    };

    card.Buttons = new List<CardAction>
    {
      new CardAction(ActionTypes.OpenUrl, "text", value: url)
    };

    card.Images = new List<CardImage>{
      new CardImage(url = image)
    };

    response.Attachments.Add(card.ToAttachment());

    return await context.PostAsync(response);
  }
}
```
</details>

## Installation
- NodeJS via npm: `botbuilder-cognitiveservices`
- .NET via Nuget package: `Microsoft.Bot.Builder.CognitiveServices`

## QnA Maker Dialog
Personalization in the response to the user according to the reliability control.

```csharp
[Serializable]
[QnAMaker("subscriptionKey", "knowledgeId", "standard phrase when it doesn't satisfy the minimum response reliability index", 0.5, 1)]
public class QnADialogWithActiveLearning : QnAMakerDialog 
{
}
```

# Channels 
A channel is a connection between Bot Framework and communication applications.

## Publish
- **Skype:**
> A Skype account is required, we can deploy bots to test.
- **Microsoft Teams:**
> An office 365 account is required. We need to enable the permissions to use external apps from the administration panel of Office 365 (Configuration/Services...).
- **Telegram:**
> A Telegram account is required. **BotFather** is an app that we need to install to create and manage our bots, check [here](https://telegram.me/botfather).
- **Web Chat:**
> It's inserted using a HTML Iframe.
- **Slack:**
> It's required to create an app from Slack API, add a new Redirect URL to https://slack.botframework.com and enter the credentials.

## Resources ⛩
- [Microsoft labs for learning to develop AI-oriented applications](https://azure.github.io/LearnAI-Bootcamp/)
- [Microsoft Bot Framework Resources](https://blogs.msdn.microsoft.com/smich/2016/09/30/microsoft-bot-framework-resources/)

## Credits 👍
- **[TI Capacitación](https://ticapacitacion.com)**

## Contributing ✨
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.  
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated** ❤️.  
You can learn more about how you can contribute to this project in the [contribution guide](https://github.com/proyecto26/MyBot/blob/master/CONTRIBUTING.md).

## Collaborators 🥇
[<img alt="jdnichollsc" src="https://avatars3.githubusercontent.com/u/2154886?v=3&s=117" width="117">](https://github.com/jdnichollsc) |
:---: |
[Juan Nicholls](mailto:jdnichollsc@hotmail.com) |

## Supporting 🍻
I believe in Unicorns 🦄
Support [me](http://www.paypal.me/jdnichollsc/2), if you do too.

## License ⚖️
This repository is available under the [MIT License](https://github.com/proyecto26/MyBot/blob/master/LICENSE).

## Happy coding 💯
Made with ❤️

<img width="150px" src="https://avatars0.githubusercontent.com/u/28855608?s=200&v=4" align="right">

const Quiz = require("../models/Quiz.js");
const Question = require("../models/Questions.js");
const Topic = require("../models/Topics.js")
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: process.env.CHAT_GPT_API_KEY,
});

const openai = new OpenAIApi(config);

module.exports = async (req, res) => {
    // console.log("Quiz Post page. Session UserId -> ", req.session.userId);
    // console.log("Quiz Post page. body ", req.body);
    // console.log("Quiz Post page. Topic ID  ", req.params.topicId);
    const topidIdFromParam = req.params.topicId;

    // Use HTML to style the question
    // For Answer Field, don't send like Option1, Option2. Send me the answer itself

    
    const chatGptMessage = `Create a quiz with 15 questions (trueFalse, multipleChoice, singleChoice) with below content after sample json format and return the response in the provided json format
    {
        "Description": "Test your knowledge of Object-Oriented Programming",
        "Questions": {
          "Question1": {
            "Question": "True or False: An object in Object-Oriented Programming can be both physical and logical.",
            "Option1": "True",
            "Option2": "False",
            "QuestionType": "trueFalse",
            "Answer": "True"
          },
          "Question2": {
            "Question": "Which of the following is an example of an object?",
            "Option1": "if-else statement",
            "Option2": "Class",
            "Option3": "Chair",
            "Option4": "Method",
            "QuestionType": "multipleChoice",
            "Answer": "Class,Chair"
          }
        }
      }
    The content is below. If content is less, Create a quiz with 15 questions and return only json.
    `;

    var prompt = chatGptMessage + req.body.description;

    console.log("Prompt message -> " + prompt);
    console.log();
    console.log();

    const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 3100,
		temperature: 1,
	});

    console.log("Response Data ", response.data);
    const parsableJSONresponse = response.data.choices[0].text;

    // $$$$
    
    // const parsableJSONresponse =`{
    //     "Description": "Test your knowledge of Object-Oriented Programming",
    //     "Questions": {
    //       "Question1": {
    //         "Question": "True or False: An object in Object-Oriented Programming can be both physical and logical.",
    //         "QuestionType": "True/False",
    //         "Answer": "True"
    //       },
    //       "Question2": {
    //         "Question": "Which of the following is an example of an object?",
    //         "Option1": "if-else statement",
    //         "Option2": "Class",
    //         "Option3": "Chair",
    //         "Option4": "Method",
    //         "QuestionType": "MCQs One answer",
    //         "Answer": "Chair"
    //       },
    //       "Question3": {
    //         "Question": "What is the purpose of Object-Oriented Programming?",
    //         "Option1": "Simplify software development",
    //         "Option2": "Optimize code execution",
    //         "Option3": "Enhance network security",
    //         "Option4": "Perform complex calculations",
    //         "QuestionType": "MCQs One answer",
    //         "Answer": "Simplify software development"
    //       },
    //       "Question4": {
    //         "Question": "Which of the following best describes polymorphism?",
    //         "Option1": "Performing the same task in different ways",
    //         "Option2": "Creating objects from classes",
    //         "Option3": "Inheriting properties from a superclass",
    //         "Option4": "Using multiple threads for parallel execution",
    //         "QuestionType": "MCQs One answer",
    //         "Answer": "Performing the same task in different ways"
    //       },
    //       "Question5": {
    //         "Question": "True or False: Objects can communicate with each other by directly accessing each other's data and code.",
    //         "QuestionType": "True/False",
    //         "Answer": "False"
    //       },
    //       "Question6": {
    //         "Question": "Which of the following are examples of polymorphism in Java? (Select multiple answers)",
    //         "Option1": "Method overloading",
    //         "Option2": "Method overriding",
    //         "Option3": "Class instantiation",
    //         "Option4": "Interface implementation",
    //         "QuestionType": "MCQs Multiple answer",
    //         "Answer": "Method overloading, Method overriding"
    //       }
    //     }
    //   }`;
    
    console.log("parsableJSONresponse ->", parsableJSONresponse);
    console.log("Going to parse");

    const quizObject = JSON.parse(parsableJSONresponse);

    console.log("Parse completed");
    console.log("");
    console.log("");
    console.log("quizObject -> " , quizObject);
    // console.log("");
    // console.log("");

    let quizObj = {};
    quizObj.userId = req.session.userId;
    quizObj.topicId = topidIdFromParam; 
    quizObj.title = req.body.title;
    quizObj.image = req.body.image;
    quizObj.description = quizObject.Description;
    quizObj.totalQuestions = req.body.numQuestions;


    let createdQuizObj = await Quiz.create(quizObj);
    console.log("createdQuizObj -> " , createdQuizObj);

    await Topic.findOneAndUpdate({ "_id": topidIdFromParam}, {  $inc: {noOfQuizzesAvailable: 1}})

    let count = 0;
    for (const questionKey in quizObject.Questions) {
        if (quizObject.Questions.hasOwnProperty(questionKey)) {

            let questionObj = {};
            questionObj.userId = req.session.userId;
            questionObj.topicId = topidIdFromParam;
            questionObj.quizId = createdQuizObj._id;


            const question = quizObject.Questions[questionKey];
            questionObj.question = question.Question;
            questionObj.answer = question.Answer;
            questionObj.questionType = question.QuestionType;
            
            const options = [];
            if (question.Option1 !== undefined) options.push(question.Option1);
            if (question.Option2 !== undefined) options.push(question.Option2);
            if (question.Option3 !== undefined) options.push(question.Option3);
            if (question.Option4 !== undefined) options.push(question.Option4);
            questionObj.options = options;

            const createdQuestionObj = await Question.create(questionObj);
            console.log("createdQuestionObj", count++, " -> ", createdQuestionObj.question);
            //   console.log(`Option1: ${question.Option1}`);
            //   console.log(`Option2: ${question.Option2}`);
            //   console.log(`Option3: ${question.Option3}`);
            //   console.log(`Option4: ${question.Option4}`);
            //   console.log(`Answer: ${question.Answer}`);
            console.log('----------------------');
        }
    }
    console.log(' Quiz questions persisted and before result.');
    return res.status(200).send({
        "message": "Quiz created successfully",
        quiz: quizObj
    });
}
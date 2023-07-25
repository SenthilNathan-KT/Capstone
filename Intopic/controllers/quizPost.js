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

    const chatGptMessage = `Create a quiz for me with above content.
    No Of Questions : 6
    QuestionType: trueFalse, multipleChoice, singleChoice (30% mixed)
    Use HTML to style the question
    Return the response in below JSON format
    For Answer Field, don't send like Option1, Option2. Send me the answer itself
    {
        "Description": "Desc in 1 sentence",
        "Questions": {
            "Question1": {
                "Question": "Question",
                "Option1": "Option1",
                "Option2": "Option2",
                "Option3": "Option3",
                "Option4": "Option4",
                "Answer": "Answer1,Answer2",
                "QuestionType": "QuestionType"
            }
        }
    }`;

    var prompt = req.body.quiztext + chatGptMessage;

    // console.log(prompt);

    // const response = await openai.createCompletion({
	// 	model: "text-davinci-003",
	// 	prompt: prompt,
	// 	max_tokens: 2048,
	// 	temperature: 1,
	// });

    // console.log("Response Data ", response.data);
    // // console.log("");
    // // console.log("");
    // // console.log("");
    // // console.log("Response Choices text ", response.data.choices[0].text);
    
    
    // const parsableJSONresponse = response.data.choices[0].text;
    
    // console.log("GPT parsableJSONresponse object -> ", parsableJSONresponse);
    // console.log("");
    // console.log("");

    // $$$$
    
    const parsableJSONresponse =`{
        "Description": "Test your knowledge of Object-Oriented Programming",
        "Questions": {
          "Question1": {
            "Question": "True or False: An object in Object-Oriented Programming can be both physical and logical.",
            "QuestionType": "True/False",
            "Answer": "True"
          },
          "Question2": {
            "Question": "Which of the following is an example of an object?",
            "Option1": "if-else statement",
            "Option2": "Class",
            "Option3": "Chair",
            "Option4": "Method",
            "QuestionType": "MCQs One answer",
            "Answer": "Chair"
          },
          "Question3": {
            "Question": "What is the purpose of Object-Oriented Programming?",
            "Option1": "Simplify software development",
            "Option2": "Optimize code execution",
            "Option3": "Enhance network security",
            "Option4": "Perform complex calculations",
            "QuestionType": "MCQs One answer",
            "Answer": "Simplify software development"
          },
          "Question4": {
            "Question": "Which of the following best describes polymorphism?",
            "Option1": "Performing the same task in different ways",
            "Option2": "Creating objects from classes",
            "Option3": "Inheriting properties from a superclass",
            "Option4": "Using multiple threads for parallel execution",
            "QuestionType": "MCQs One answer",
            "Answer": "Performing the same task in different ways"
          },
          "Question5": {
            "Question": "True or False: Objects can communicate with each other by directly accessing each other's data and code.",
            "QuestionType": "True/False",
            "Answer": "False"
          },
          "Question6": {
            "Question": "Which of the following are examples of polymorphism in Java? (Select multiple answers)",
            "Option1": "Method overloading",
            "Option2": "Method overriding",
            "Option3": "Class instantiation",
            "Option4": "Interface implementation",
            "QuestionType": "MCQs Multiple answer",
            "Answer": "Method overloading, Method overriding"
          }
        }
      }`;
    // console.log("parsableJSONresponse ->", parsableJSONresponse);
	
    console.log("Going to parse");

    const quizObject = JSON.parse(parsableJSONresponse);

    console.log("Parse completed");
    console.log("");
    console.log("");
    console.log("quizObject -> " , quizObject);
    // console.log("");
    // console.log("");
    // console.log("quizObject [0] Question-> " , quizObject.Questions.Question1.Question);
    // console.log("");
    // console.log("");
    // console.log("quizObject [0] Answer -> " , quizObject.Questions.Question1.Answer);
    
    // console.log("For loop started + ", quizObject.Questions);

    let quizObj = {};
    quizObj.userId = req.session.userId;
    quizObj.topicId = "64a75c5456e48f937b404903"; // TODO Update this topic ID with param value
    quizObj.title = req.body.quizname;
    quizObj.description = quizObject.Description;


    let createdQuizObj = await Quiz.create(quizObj);
    console.log("createdQuizObj -> " , createdQuizObj);

    await Topic.findOneAndUpdate({"_id":"64a75c5456e48f937b404903"}, {$inc: {noOfQuizzesAvailable: 1}})

    let count = 0;
    for (const questionKey in quizObject.Questions) {
        if (quizObject.Questions.hasOwnProperty(questionKey)) {

            let questionObj = {};
            questionObj.userId = req.session.userId;
            questionObj.topicId = "64a75c5456e48f937b404903";
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
      
    res.status(200).send({
        "message": "Quiz created successfully",
        quiz: quizObj
    });
}
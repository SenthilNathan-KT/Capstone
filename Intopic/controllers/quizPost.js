const Quiz = require("../models/Quiz.js")
const Question = require("../models/Questions.js")
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: process.env.CHAT_GPT_API_KEY,
});

const openai = new OpenAIApi(config);

module.exports = async (req, res) => {
    console.log("Quiz Post page. Session UserId -> ", req.session.userId);
    console.log("Quiz Post page. body ", req.body);

    const chatGptMessage = `Create a quiz for me with above content.
    No Of Questions : 2
    QuestionType: MCQs One answer, MCQs Multiple answer, True/false
    For question field you can use HTML to style the question
    Return the response in below JSON format
    {
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
    // console.log("");
    // console.log("");
    // console.log("");
    // console.log("Response Choices text ", response.data.choices[0].text);
    // console.log();
    // console.log();
    
    // const parsableJSONresponse = response.data.choices[0].text;
    
    // console.log("GPT parsableJSONresponse object -> ", parsableJSONresponse);
    // console.log("Going to parse");

    // $$$$
    
    const parsableJSONresponse =`{
        "Questions": {
            "Question1": {
                "Question": "What is an object in Object Oriented Programming?",
                "Option1": "A software module",
                "Option2": "A real-world entity",
                "Option3": "A programming language",
                "Option4": "A library",
                "Answer": "A real-world entity"
            },
            "Question2": {
                "Question": "What is polymorphism?",
                "Option1": "The reuse of existing code",
                "Option2": "The ability to do the same task in different ways",
                "Option3": "The ability to understand multiple programming languages",
                "Option4": "The ability to communicate between objects",
                "Answer": "The ability to do the same task in different ways"
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
    quizObj.topicId = "64a75c5456e48f937b404903";
    quizObj.title = req.body.quizname;
    quizObj.description = "Need to get from Chat GPT";

    let createdQuizObj = await Quiz.create(quizObj);
    console.log("createdQuizObj -> " , createdQuizObj);

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
            console.log("createdQuestionObj -> ", createdQuestionObj);
            //   console.log(`Option1: ${question.Option1}`);
            //   console.log(`Option2: ${question.Option2}`);
            //   console.log(`Option3: ${question.Option3}`);
            //   console.log(`Option4: ${question.Option4}`);
            //   console.log(`Answer: ${question.Answer}`);
            console.log('----------------------');
        }
    }
      
    res.status(200).send({
        "message": "Quiz Post page.",
        "Q": quizObject.Questions.Question1.Question,
        "A": quizObject.Questions.Question1.Answer
    });
}
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: process.env.CHAT_GPT_API_KEY,
});

const openai = new OpenAIApi(config);

const runPrompt = async () => {
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

	var prompt = `
    Object means a real-world entity such as a pen, chair, table, computer, watch, etc. Object-Oriented Programming is a methodology or paradigm to design a program using classes and objects. It simplifies software development and maintenance by providing some concepts: 
    Any entity that has state and behavior is known as an object. For example, a chair, pen, table, keyboard, bike, etc. It can be physical or logical. An Object can be defined as an instance of a class. An object contains an address and takes up some space in memory. Objects can communicate without knowing the details of each other's data or code. The only necessary thing is the type of message accepted and the type of response returned by the objects. 
    Example: A dog is an object because it has states like color, name, breed, etc. as well as behaviors like wagging the tail, barking, eating, etc.
    If one task is performed in different ways, it is known as polymorphism. For example: to convince the customer differently, to draw something, for example, shape, triangle, rectangle, etc. 
    In Java, we use method overloading and method overriding to achieve polymorphism. Another example can be to speak something; for example, a cat speaks meow, dog barks woof, etc.
    `;

    prompt += chatGptMessage;

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
    // const quizObject = JSON.parse(parsableJSONresponse);
    


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
    console.log("parsableJSONresponse ->", parsableJSONresponse);
	
    console.log("Going to parse");
    const quizObject = JSON.parse(parsableJSONresponse);



    console.log("Parse completed");
    console.log("");
    console.log("");
    console.log("quizObject -> " , quizObject);
    console.log("");
    console.log("");
    console.log("quizObject questions -> " , quizObject.Questions);
    console.log("");
    console.log("");
    console.log("quizObject [0] Question-> " , quizObject.Questions.Question1.Question);
    console.log("");
    console.log("");
    console.log("quizObject [0] Answer -> " , quizObject.Questions.Question1.Answer);

};

runPrompt();
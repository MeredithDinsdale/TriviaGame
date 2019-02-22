$(document).ready(function() {

	//Global Variables
	var currentQ;		//Question currently being asked

	var correctAnswer;	// ------------------
	var wrongAnswer;	//Score Count
	var unanswered;		// ------------------

	var answered; 		//Used as Boolean
	
						//=============
	var seconds;		//TIMER
	var time;			//=============
	
	var userChoice;		// Stores user Input

	var text = {
		correct: "Nice Job!",
		incorrect: "Not quite right. Better luck next time.",
		noTime: "You've run out of time!",
		done: "You've done it! Let's look at how you did...",
	};

	var triviaQuestions = [
		{	
			question: "How big can adult racoons get?",
			choices: ["20 lbs", "30 lbs", "40 lbs", "50 lbs", "60 lbs"],
			correct: 4,
			image: "",
			answerText: "Adult male raccoons can be as large as 60 lbs! Wouldn't want to run into one of those in your bathrobe at 2 am.",
		},

		{
			question: "What is the average lifespan of wild raccoons?",
			choices: ["2.5 years", "5.7 years", "7 years", "10 years", "40 years"],
			correct: 0,
			image: "",
			answerText: "Wild racoons only live about 2.5 years on average. Ain't no rest for the wicked!",
		},

		{
			question: "What is unique about a racoon's tail?",
			choices: ["It can be used to hold onto things", "It has black rings up and down it", "It is always twice the length of the tail owner's body", "It can be used as a weapon to whip predators", "It has barbs mixed in with the fur, similar to a porcupine or hedgehog"],
			correct: 1,
			image: "",
			answerText: "Racoon tails have black rings going up and down their tails. It's pretty much for aesthetic purposes only.",
		},

		{
			question: "What are raccoon young called?",
			choices: ["Pups", "Budgies", "Kittens", "Cubs", "Tykes"],
			correct: 2,
			image: "",
			answerText: "Baby raccoons are called kittens! Aww...",
		},
		{
			question: "How long can captive raccoons live?",
			choices: ["4 years", "7 years", "12 years", "16 years", "20 years"],
			correct: 4,
			image: "",
			answerText: 'Raccoons living in captivity can live for up to 20 years. Secret to long life: don\'t eat trash.',
		},
		{
			question: "How many raccoons does it take to screw in a lightbulb?",
			choices: ["1", "2", "3", "4", "5"],
			correct: 3,
			image: "",
			answerText: 'Four. One to smash the old one, one to smash the new one, one to hold the stool, and one to chew the wires because it\'s too bright in here anyways."'
		},
		{
			question: "What do raccoons not eat?",
			choices: ["Shellfish", "Red meat", "Carbs", "Gluten", "Pine needles"],
			correct: 4,
			image: "",
			answerText: "Raccoons don't eat pine needles."
		},
	];

	// Hides questions when game starts up
	$("#gameArea").hide();

	// Hides the start button once it's clicked
	$("#startBtn").on("click", function(){
		$("#startGame").hide();
		newGame();
	});

	// Reset Button
	$("#startOverBtn").on("click", function(){
		$("#Results").hide();
		newGame();
	});

	//=========================================FUNCTIONS=================================================
	function newGame() {
		$("#gameArea").show();
		$("#Answer").hide();
		$("#Results").hide();		
		correctAnswer = 0;
		wrongAnswer = 0;
		unanswered = 0;
		currentQ = 0;
		questions();
	}

	function questions() {
		$("#Answer").hide();
		$("#Questions").show();
		answered = true;
		$(".question").html(triviaQuestions[currentQ].question);
		for (var i = 0; i <= 5; i++) {
			var list = $("<div>");
			list.text(triviaQuestions[currentQ].choices[i]);
			list.attr({"data-index": i });
			list.addClass("thisChoice");
			$(".choices").append(list);
		}
		countdown();
		$(".thisChoice").on("click",function(){
			userChoice = $(this).data("index");
			clearInterval(time);
			shoAnswer();
		});
	}

	function countdown() {
		seconds = 20;
		$("#time").html("00:" + seconds);
		answered = true;

		time = setInterval(countDownSho, 1000);
	}

	// ==================
	// SHOWS TIMER
	// ==================
	function countDownSho() {
		seconds --;
		if(seconds < 10) {
			$("#time").html("00:0" + seconds);
			$("#time").css({"color": "red"});
		} else {
			$("#time").html("00:" + seconds);
			$("#time").css({"color": "#def"});
		}

		if (seconds < 1) {
			clearInterval(time);
			answered = false;
			shoAnswer();
		}
	}
	// ====================================
	// DISPLAYS ANSWER DIV
	// ====================================
	function shoAnswer() {
		$("#Questions").hide();
		$("#Results").hide();
		$("#Answer").show();
		$(".thisChoice").empty();

		var rightAnswerText = triviaQuestions[currentQ].choices[triviaQuestions[currentQ].correct];
		var rightAnswerIndex = triviaQuestions[currentQ].correct;
		console.log(rightAnswerText);
		console.log(rightAnswerIndex);
		//GIF IMG
		var gifLink = triviaQuestions[currentQ].image;
		var Giffy = $("<img>");
		Giffy.attr("Src", gifLink);
		Giffy.addClass("gifImg");
		$("#gif").html(Giffy);
		// GIF TEXT
		var gifText = triviaQuestions[currentQ].answerText;
			newCap = $("<div>");
			newCap.html(gifText);
			newCap.addClass("gifCap");
			$("#gifText").html(newCap);


		// DISPLAYS AND COUNTS USER ANSWERS/ UnANSWERS
		if ((userChoice === rightAnswerIndex) && (answered === true)) {
			correctAnswer++;
			$("#text").html(text.correct);
			$("#correctAnswer").hide();
		} else if ((userChoice !== rightAnswerIndex) && (answered === true)) {
			wrongAnswer++;
			$("#text").html(text.incorrect);
			$("#correctAnswer").show().html("The correct answer was: " + rightAnswerText);
		} else {
			unanswered++;
			$("#text").html(text.noTime);
			$("#correctAnswer").html("The correct answer was: " + rightAnswerText);
			answered = true;
		}

		//Last Answer Reveal Timer
		if (currentQ === (triviaQuestions.length-1)) {
			setTimeout(results, 10000);
		} else {
			currentQ++;
			setTimeout(questions, 10000);
		}

	}

	function results() {
		$("#Answer").hide();
		$("#Questions").hide();
		$("#Results").show();
		$("#resultText").html(text.done);
		$("#correctAnswers").html("Correct Answers: " + correctAnswer);
		$("#wrongAnswers").html("Wrong Answers: " + wrongAnswer);
		$("#unanswered").html("Didn't Answer: " + unanswered);
		$("#startOverBtn").show();
		$("#startOverBtn").html("RESTART GAME");
	}

	
});
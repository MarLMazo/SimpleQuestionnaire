var myQuestions = [
  {
  question: "Who is the strongest?",
  choices: ["Superman", "The Terminator", "Waluigi, obviously"],
  correct_Answer: 2
  },
  {
  question: "What is the best site ever created?",
  choices: ["SitePoint","Simple Steps Code","Trick question; they're both the best" ],
  correct_Answer: 1
  },
  {
  question: "Where is Waldo really?",
  choices: ["Antarctica", "Exploring the Pacific Ocean", "Sitting in a tree", "Minding his own business, so stop asking"],
  correct_Answer:0
  }
];


$(document).ready(function(){
                 
  //initialize variables
  var $quizContainer = $("#quiz");
  var $choicesContainer = $("#choices");
  var $prevButton = $(".preButton");
  var $nextButton = $(".nextButton");
  var $results = $("#results");
  var $submit = $('#submit');
  var $startButton = $('.startButton');
  var $pickAnswer
  
  var questionNumber = 0;
  var choicesLength = myQuestions[questionNumber].choices.length;
  var questionChoices;

  var totalScore = 0;
  var userSelectedAnswer =[]; 
  
  function initialize(){

    //Clearing the choices Container
    questionChoices="";
    //Initializing the questions and choices 
    $quizContainer.html(myQuestions[questionNumber].question+"<br>");
    for(let i=0; i<choicesLength; i++)
    {
      if( i === userSelectedAnswer[questionNumber])
        {
          questionChoices += "<div><input type='radio' id='listChoices"+i+"'  value ='" + i + "' name='pickAnswer' checked/><label for='listChoices"+i+"'>" + myQuestions[questionNumber].choices[i] + "</label></div>";
        }
        else
        { 
         questionChoices += "<div><input type='radio' id='listChoices"+i+"'  value ='" + i + "' name='pickAnswer'><label for='listChoices"+i+"'>" + myQuestions[questionNumber].choices[i] + "</label></div>";
        }
    }
    //printing out the choices in the container
    $choicesContainer.html(questionChoices);

    //previous button is disabled when first question is open
    if(questionNumber === 0)
    {
      $prevButton.attr("disabled",true);
    }
    else
    {
      $prevButton.attr("disabled",false);
    }

    //nextbutton is disabled when it is the last questions
    if(questionNumber === myQuestions.length-1)
    {
      $nextButton.attr("disabled", true);
    }
    else{
      $nextButton.attr("disabled", false);
    }

  }

  
  function nxt(){
    userChoice();
    questionNumber++;
    initialize(); 
  };

  function prev(){
    questionNumber--;
    initialize();
  }

  function userChoice(){
    $pickAnswer = $("input[type='radio']:checked").val();
    userSelectedAnswer[questionNumber]= parseInt($pickAnswer);
    
  }

  function startButton(){
    $startButton.css("display","none");
    $nextButton.click(nxt);
    $prevButton.click(prev);
    initialize();
  }

//show the score in submit class when click and both prev and next buttons are disabled
    $submit.click(function(){
      userChoice();
      for(let i =0; i<myQuestions.length; i++)
      {
        if(userSelectedAnswer[i] === myQuestions[i].correct_Answer){
          totalScore++;      
        }
        //debugging
        // console.log(i);
        // console.log(totalScore);
        // console.log(userSelectedAnswer[i]);
        // console.log(myQuestions[i].correct_Answer);
      }
      $(document).find("#results").text("You scored: "+ totalScore+ " out of: "+ myQuestions.length);
      $prevButton.attr("disabled", true);
      $nextButton.attr("disabled", true);
      });
  
  
  //Click start button to initialize the questions
  $startButton.click(startButton);





});

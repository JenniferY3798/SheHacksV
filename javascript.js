
var co2Data = [
  ["Wheat & Rye (Bread)",1.4],
  ["Maize (Meal)",1.1],
  ["Barley (Beer)", 1.1],
  ["Oatmeal",  1.6],
  ["Rice", 4 ],
  ["Potatoes", 0.3 ],
  ["Cassava", 0.9 ],
  ["Cane Sugar", 2.6 ],
  ["Beet Sugar", 1.4 ],
  ["Other Pulses", 1.6 ],
  ["Peas", 0.8 ],
  ["Nuts", 0.2 ],
  ["Groundnuts", 2.4 ],
  ["Soymilk", 1 ],
  [" Tofu",3],
  ["Soybean Oil",6],
  ["Palm Oil" ,7.6],
  ["Sunflower Oil",3.5],
  ["Rapeseed Oil" ,3.7],
  ["Olive Oil" ,6],
  ["Tomatoes",1.4],
  ["Onions & Leeks",0.3],
  ["Root Vegetables",0.3],
  ["Brassicas" ,0.4],
  ["Other Vegetables",0.5],
  ["Citrus Fruit", 0.3],
  ["Bananas" ,0.8],
  ["Apples",0.3],
  ["Berries & Grapes",1.1],
  ["Wine",1.4],
  ["Other Fruit",0.7],
  ["Coffee",16.5],
  ["Dark Chocolate",18.7],
  ["Beef (beef herd) ",59.6],
  ["Beef (dairy herd)",21.1],
  ["Lamb & Mutton",24.5],
  ["Pig Meat",7.2],
  ["Poultry Meat",6.1],
  ["Milk",2.8],
  ["Cheese",21.2],
  ["Eggs",4.5],
  ["Fish (farmed)",5.1],
  ["Shrimps (farmed)",11.8]
];

// !-- calculate individual score & average to sum   ------------------------------------------------------------------------------------------------------------------------

var count;

function calculateScoreMeal() {
  var score = (count * 100 - 10 * calcuCarbon() )/count;
  if (score < 0) {
    score = 0;
  }
  document.getElementById("score").innerHTML = score.toFixed(2);
}


// !-- unimplemented   ------------------------------------------------------------------------------------------------------------------------
//calculate and display carbon emission per item
function calcuCarbon(){
  count = 0;
  var totalCarbon = 0;
  
  //get user input from dropdown menu
  var ingredient = document.getElementById("set_ingredient").value;
  //get corresponding number value
  var carbonEmissionPerKg = co2Data[ingredient][1];
  
  //get user input from type in
  var ingredientMass = document.getElementById("mass").value;
  //calculate carbon emission from one ingredient
  var carbonEmissionItem = carbonEmissionPerKg/1000 * ingredientMass;
  //display the numerical value on html
  document.getElementById("carbonItem").innerHTML = carbonEmissionItem.toFixed(2);
  
  if (ingredientMass>0){
    count++;
  }
  
  totalCarbon = totalCarbon + carbonEmissionItem;
  
  for(var i = 2; i<sectionsCount;i++){
    var ingredient = document.getElementById("set_ingredient" + i).value;
    var carbonEmissionPerKg = co2Data[ingredient][1];
    var ingredientMass = document.getElementById("mass" + i).value;
    var carbonEmissionItem = carbonEmissionPerKg/1000 * ingredientMass;
    document.getElementById("carbonItem" + i).innerHTML = carbonEmissionItem.toFixed(2);
    totalCarbon = totalCarbon + carbonEmissionItem;
     if (ingredientMass>0){
         count++;
     }
  }
  document.getElementById("carbonTotal").innerHTML = totalCarbon.toFixed(2);
  return totalCarbon;
  
  
}


// !-- go to top button   ------------------------------------------------------------------------------------------------------------------------
//Go to Top Button
var mybutton;
mybutton = document.getElementById("myBtn");

window.onscroll = function() {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// !-- unimplemented   ------------------------------------------------------------------------------------------------------------------------
// function saveIngredients(){
//   meal.push([document.getElementById("set_ingredient").value, document.getElementById("mass").value])
// }


function search(name) {
  for (var i = 0; i < co2Data.length; i++) {
    if (name == co2Data[i][0]) {
      return i
    }
    else {
      return -1
    }
  }
}

function highestScore(scores) {
  var highestScore = 0;
  var winners = [''];
  for (var key in scores){
    if (scores[key] > highestScore) {
      highestScore = scores[key];
      winners = [key];
    }
    else if (scores[key] == highestScore) {
      winners.push(key);
    }
  }
  return winners, highestScore;
}

function leaderboard(scores) {
  var temp = {};
  var leaders = [];
  for (var i = 0; i < scores.length; i++) {
    var winners, highest = highestScore(scores)
    for (var j = 0; j < winners.length; j++)
      {
        temp[winners[j]] = highest;
        delete scores[winners[j]];
        leaders.push(winners[j] + ', ' + highest);       
      }
  }
  scores = temp;
  document.getElementById("leaders").innerHTML = leaders;
}

// !-- carb  ------------------------------------------------------------------------------------------------------------------------

//define template
var template = $('#carb .carb:first').clone();

//define counter
var sectionsCount = 6;

//add new section
$('body').on('click', '.addsection', function() {

    //increment
    sectionsCount++;

    //loop through each input
    var section = template.clone().find(':input').each(function(){

        //set id to store the updated section number
        var newId = this.id + sectionsCount;

        //update for label
        $(this).prev().attr('for', newId);

        //update id
        this.id = newId;

    }).end()

    //inject new section
    .appendTo('#carb');
});

//remove section
$('#carb').on('click', '.remove', function() {
    //fade out section
    $(this).parent().fadeOut(0, function(){
        //remove parent element (main section)
        $(this).parent().parent().empty();
        return false;
    });
    return false;
});

// !-- veggie  ------------------------------------------------------------------------------------------------------------------------
var template2 = $('#veggie .veggie:first').clone();


$('body').on('click', '.addsection2', function() {

    //increment
    sectionsCount++;

    //loop through each input
    var section = template2.clone().find(':input').each(function(){

        //set id to store the updated section number
        var newId = this.id + sectionsCount;

        //update for label
        $(this).prev().attr('for', newId);

        //update id
        this.id = newId;

    }).end()

    //inject new section
    .appendTo('#veggie');
});

//remove section
$('#veggie').on('click', '.remove2', function() {
    //fade out section
    $(this).parent().fadeOut(0, function(){
        //remove parent element (main section)
        $(this).parent().parent().empty();
        return false;
    });
    return false;
});
// !-- fruits  ------------------------------------------------------------------------------------------------------------------------
var template3 = $('#fruits .fruits:first').clone();

$('body').on('click', '.addsection3', function() {

    //increment
    sectionsCount++;

    //loop through each input
    var section = template3.clone().find(':input').each(function(){

        //set id to store the updated section number
        var newId = this.id + sectionsCount;

        //update for label
        $(this).prev().attr('for', newId);

        //update id
        this.id = newId;

    }).end()

    //inject new section
    .appendTo('#fruits');
});

//remove section
$('#fruits').on('click', '.remove3', function() {
    //fade out section
    $(this).parent().fadeOut(0, function(){
        //remove parent element (main section)
        $(this).parent().parent().empty();
        return false;
    });
    return false;
});


// !-- protein  ------------------------------------------------------------------------------------------------------------------------
var template4 = $('#protein .protein:first').clone();


$('body').on('click', '.addsection4', function() {

    //increment
    sectionsCount++;

    //loop through each input
    var section = template4.clone().find(':input').each(function(){

        //set id to store the updated section number
        var newId = this.id + sectionsCount;

        //update for label
        $(this).prev().attr('for', newId);

        //update id
        this.id = newId;

    }).end()

    //inject new section
    .appendTo('#protein');
});

//remove section
$('#protein').on('click', '.remove4', function() {
    //fade out section
    $(this).parent().fadeOut(0, function(){
        //remove parent element (main section)
        $(this).parent().parent().empty();
        return false;
    });
    return false;
});
// !-- beverage  ------------------------------------------------------------------------------------------------------------------------
var template5 = $('#beverage .beverage:first').clone();


$('body').on('click', '.addsection5', function() {

    //increment
    sectionsCount++;

    //loop through each input
    var section = template5.clone().find(':input').each(function(){

        //set id to store the updated section number
        var newId = this.id + sectionsCount;

        //update for label
        $(this).prev().attr('for', newId);

        //update id
        this.id = newId;

    }).end()

    //inject new section
    .appendTo('#beverage');
});

//remove section
$('#beverage').on('click', '.remove5', function() {
    //fade out section
    $(this).parent().fadeOut(0, function(){
        //remove parent element (main section)
        $(this).parent().parent().empty();
        return false;
    });
    return false;
});
// !-- extras  ------------------------------------------------------------------------------------------------------------------------
var template6 = $('#extras .extras:first').clone();


$('body').on('click', '.addsection6', function() {

    //increment
    sectionsCount++;

    //loop through each input
    var section = template6.clone().find(':input').each(function(){

        //set id to store the updated section number
        var newId = this.id + sectionsCount;

        //update for label
        $(this).prev().attr('for', newId);

        //update id
        this.id = newId;

    }).end()

    //inject new section
    .appendTo('#extras');
});

//remove section
$('#extras').on('click', '.remove6', function() {
    //fade out section
    $(this).parent().fadeOut(0, function(){
        //remove parent element (main section)
        $(this).parent().parent().empty();
        return false;
    });
    return false;
});

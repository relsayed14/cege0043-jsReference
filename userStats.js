// calculate each port id's ranking and put in an indexed array
function calculateUserRanking(){
	var ranking = [];
	console.log(ranking);
	for(var i = 0 ; i < allAnswers.length ; i++){
		let user = allAnswers[i].port_id;
		let correct = allAnswers[i].answer_selected == allAnswers[i].correct_answer;
		// if no record for user in array, create a new one with value 0
		if (!ranking[""+user])
		{
			ranking[""+user] = 0;
		}
		// if answer is correct, add 1 
		if (correct){		
			ranking[""+user] = ranking[""+user] + 1;
		}
	}
	userRanking = getSortedKeys(ranking);
	
	return userRanking.indexOf(""+httpPortNumber)+1;
}

function calculateQuestionDifficulty(){
	var difficulty = [];
	console.log(difficuly);
	for(var i = 0 ; i < allAnswers.length ; i++){
		let question = allAnswers[i].question_id;
		let isCorrect = allAnswers[i].answer_selected == allAnswers[i].correct_answer;
		// if no record for user in array, create a new one with value 0
		if (!difficulty[""+question])
		{
			difficulty[""+question] = 0;
		}
		// if answer is correct, add 1 
		if (isCorrect){		
			difficulty[""+question] = difficulty[""+question] + 1;
		}
	}
	questionDifficulty = getSortedKeys(difficulty);
	

	// slice: returns subarray from index 0 to index 4
	// code adopted from https://www.w3schools.com/jsref/jsref_slice_array.asp
	return questionDifficulty.slice(0, 5);
}


// code adopted from https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key

function calculateTopFiveUsers(){
	var ranking = [];
	for(var i = 0 ; i < allAnswers.length ; i++){
		let user = allAnswers[i].port_id;
		let correct = allAnswers[i].answer_selected == allAnswers[i].correct_answer;
		// if no record for user in array, create a new one with value 0
		if (!ranking[""+user])
		{
			ranking[""+user] = 0;
		}
		// if answer is correct, add 1 
		if (correct){		
			ranking[""+user] = ranking[""+user] + 1;
		}
	}

	var userRanking = getSortedKeys(ranking);

	return [
	 {port:userRanking[0],correct:ranking[''+userRanking[0]]},{port:userRanking[1],correct:ranking[''+userRanking[1]]},
	{port:userRanking[2],correct:ranking[''+userRanking[2]]},{port:userRanking[3],correct:ranking[''+userRanking[3]]}, 
	{port:userRanking[4],correct:ranking[''+userRanking[4]]}]; 
}

function getSortedKeys(obj) {
    var keys = []; 
    for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}
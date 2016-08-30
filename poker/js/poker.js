var cardsA = [];
var cardsB = [];

function dealer() {

	// Deck shuffle
	function fisherYShuffle(cardArray) {
		for (var i = cardArray.length - 1; i > 0; i--) {
			var index = Math.floor(Math.random() * i);
			var tmp = cardArray[index];
			cardArray[index] = cardArray[i];
			cardArray[i] = tmp;
		}
	}

	// Create Deck
	var deck = [];
		for (i = 0; i <= 51; i++) {
			deck[i] = i + 1;
			console.log(deck[i]);
		}

	fisherYShuffle(deck);
		for (i = 0; i <= 51; i++) {
			console.log(deck[i]);
		}

	// Create hands
	var handA = [];
	var handB = [];
	var displayCards = document.getElementsByClassName('card-display');
	for (i = 0; i <= 9; i++) {
			dealtCard = deck[i];
			if (i%2 === 0) {
			handA.push(dealtCard);
			} else {
			handB.push(dealtCard);
			}
		}


//show card images
	for (i = 0; i <= 4; i++) {
		var numB = handB[i];
		var stringB = numB.toString();
		var urlB = 'images/' + stringB + '.gif';
		displayCards[i].setAttribute("src", urlB);	
		var numA = handA[i];
		var stringA = numA.toString();
		var urlA = 'images/' + stringA + '.gif';
		displayCards[i+5].setAttribute("src", urlA);
	}



// Card Ojects
	for (i = 0; i <= 4; i++) {
			if (handA[i] <= 13) {
				cardValue = handA[i];
				cardsA[i] = {
					value: cardValue, suit: "d"
				};
			} else if ((handA[i] > 13) && (handA[i] <= 26)) {
				cardValue = handA[i] - 13;
				cardsA[i] = {
					value: cardValue, suit: 'c'
				};
			} else if ((handA[i] > 26) && (handA[i] <= 39)) {
				cardValue = handA[i] - 26;
				cardsA[i] = {
					value: cardValue, suit: 'h'
				};
			} else {
				cardValue = handA[i] - 39;
				cardsA[i] = {
					value: cardValue, suit: 's'
				};
			}
			if ((cardsA[i].value === 1) || (cardsA[i].value >= 10)) {
				cardsA[i].face = 'face';
			}
			if (handB[i] <= 13) {
				cardValue = handB[i];
				cardsB[i] = {
					value: cardValue, suit: "d"
				};
			} else if ((handB[i] > 13) && (handB[i] <= 26)) {
				cardValue = handB[i] - 13;
				cardsB[i] = {
					value: cardValue, suit: 'c'
				};
			} else if ((handB[i] > 26) && (handB[i] <= 39)) {
				cardValue = handB[i] - 26;
				cardsB[i] = {
					value: cardValue, suit: 'h'
				};
			} else {
				cardValue = handB[i] - 39;
				cardsB[i] = {
					value: cardValue, suit: 's'
				};
			}
			if ((cardsB[i].value === 1) || (cardsB[i].value >= 10)) {
				cardsB[i].face = 'face';
			}
	}

	handComparison();
}
function handComparison(){
	var i, j;
	var pointsA = 0;
	var pointsB = 0;

	//sort cards 
	cardsA.sort(function(c, d) {
		if (c.value < d.value) return -1;
		if (c.value > d.value) return 1;		
		return 0;
	});
	cardsB.sort(function(c, d) {
		if (c.value < d.value) return -1;
		if (c.value > d.value) return 1;		
		return 0;
	});

	// High Aces
	if ((cardsA[0].value !== 1) || (cardsA[1].value !== 2) || (cardsA[2].value !== 3) || (cardsA[3].value !== 4) || (cardsA[4].value !== 5)) { 
		for (i = 0; i <=4; i++) {			
			if (cardsA[i].value === 1) { 	
				cardsA[i].value = 14;		
			}
		}
		cardsA.sort(function(c, d) {		
			if (c.value < d.value) return -1;
			if (c.value > d.value) return 1;		
			return 0;
		});
	}

	if ((cardsB[0].value !== 1) || (cardsB[1].value !== 2) || (cardsB[2].value !== 3) || (cardsB[3].value !== 4) || (cardsB[4].value !== 5)) { 
		for (i = 0; i <=4; i++) {							
			if (cardsB[i].value === 1) { 				
				cardsB[i].value = 14;					
			}
		}
		cardsB.sort(function(c, d) {						
			if (c.value < d.value) return -1;
			if (c.value > d.value) return 1;		
			return 0;
		});
	}


	// Straight check
	for (i=1; i <= 4; i++){
		j = i-1;
		if (cardsA[i].value !== cardsA[j].value +1 ) break;
		var straightStreakA = i;
	}

		if (straightStreakA === 4) {
		pointsA = pointsA + 400 + cardsA[4].value;
	}

	for (i=1; i <= 4; i++){
		j = i-1;
		if (cardsB[i].value !== cardsB[j].value +1 ) break;
		var straightStreakB = i;
	}

		if (straightStreakB === 4) {
		pointsB = pointsB + 400 + cardsB[4].value;
	}

	// Flush check
	for (i = 1; i <=4; i++) {									
		if (cardsA[i].suit !== cardsA[j].suit) break;
		var flushStreakA = i;
	}

	if (flushStreakA === 4) {
		pointsA = pointsA + 500 + cardsA[4].value;			
	}
	for (i = 1; i <=4; i++) {									
		j = i - 1;
		if (cardsB[i].suit !== cardsB[j].suit) break;
		var flushStreakB = i;
	}
	if (flushStreakB === 4) {
		pointsB = pointsB + 500 + cardsB[4].value;	
	}

	// Check for Pairs, Full House, 4 of a Kind and High Cards	
	if (pointsA < 400) {											
		var highCardA;
		var pairsA = [];
		for (i = 1; i <= 4; i++){									
			j = i - 1;
			if (cardsA[i].value === cardsA[j].value) {
				pairsA[j] = 1;
				highCardA = cardsA[i].value;
			} else {
				pairsA[j] = 0;
			}
		}
		var numPairsA = 0;											
		for (i = 0; i <= 3; i++) {
			numPairsA = numPairsA + pairsA[i];
		}

		if (numPairsA === 1) {										
			pointsA = pointsA + 100 + highCardA;
		}

		if (numPairsA === 2) {										
			if ((pairsA[0] === 1 && pairsA[1] === 1) || (pairsA[1] === 1 && pairsA[2] === 1) || (pairsA[2] === 1 && pairsA[3] === 1)) {
				pointsA = pointsA + 300 + cardsA[2].value;
				
			} else {
				pointsA = pointsA + 200 + cardsA[3].value;
				
			}
		}

		if ((numPairsA === 3) && (pairsA[1] === 0 || pairsA[2] === 0)) {	
			pointsA = pointsA + 600 + cardsA[4].value;
		}

		if ((numPairsA === 3) && (pairsA[0] === 0 || pairsA[3] === 0)) {	
			mpointsA = pointsA + 700 + cardsA[3].value;								
		}
		
		if (numPairsA === 0) {										
			pointsA = pointsA + cardsA[4].value;
		}
	}

	//Repeat loop for handB
	if (pointsB < 400) {											
		var highCardB;
		var pairsB = [];
		for (i = 1; i <= 4; i++) {									
			j = i - 1;
			if (cardsB[i].value === cardsB[j].value) {
				pairsB[j] = 1;
				highCardB = cardsB[i].value;
			} else {
				pairsB[j] = 0;
			}
		}
		var numPairsB = 0;											
		for (i = 0; i <= 3; i++) {
			numPairsB = numPairsB + pairsB[i];
		}

		if (numPairsB === 1) {										
			pointsB = pointsB + 100 + highCardB;
		}

		if (numPairsB === 2) {										
			if ((pairsB[0] === 1 && pairsB[1] === 1) || (pairsB[1] === 1 && pairsB[2] === 1) || (pairsB[2] === 1 && pairsB[3] === 1)) {
				pointsB = pointsB+ 300 + cardsB[2].value;
				
			} else {
				pointsB = pointsB + 200 + cardsB[3].value;
				
			}
		}

		if ((numPairsB === 3) && (pairsB[1] === 0 || pairsB[2] === 0)) {	
			pointsB = pointsB + 600 + cardsB[4].value;
		}

		if ((numPairsB === 3) && (pairsB[0] === 0 || pairsB[3] === 0)) {	
			mpointsB = pointsB + 700 + cardsB[3].value;								
		}
		
		if (numPairsB === 0) {										
			pointsB = pointsB + cardsB[4].value;
		}
	}

	if (pointsA > pointsB){
		resultA = "Win!";
		resultB = "Lose!";
	}

	if (pointsB > pointsA) {
		resultA = "Lose!";
		resultB = "Win!";
	}

	if (pointsA === pointsB) {
		resultA = "Tie";
		resultB = "Tie";
	}

	document.getElementById('result-a').innerHTML = pointsA + " " + resultA;
	document.getElementById('result-b').innerHTML = pointsB + " " + resultB;

}

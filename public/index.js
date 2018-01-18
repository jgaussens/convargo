'use strict';
//test commit
//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0, 'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0, 'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0, 'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'rentalId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];



// Practice Work

function getTruckerId(id){ //Function useful to get access to a trucker id from another function
	var ret = 0;
	truckers.forEach(function(trucker){
		if (trucker.id == id){
			ret = trucker;
		}
	});
	return ret;
}

function getDeliveryId(id){ //Function useful to get access to a delivery id from another function
	var ret = 0;
	deliveries.forEach(function(delivery){
		if (delivery.id == id){
			ret = delivery;
		}
	});
	return ret;
}


//Exercise 1 + 2 + 4
function computeShippingPrice(delivery) {	//Computes the total shipping price, including the eventual deductible reduction
	var id = getTruckerId(delivery.truckerId);
	if (id != 0) {
		
		delivery.price = delivery.distance * id.pricePerKm;
		var pricePerVolume = id.pricePerVolume;
		
		if (delivery.volume > 25) {
			pricePerVolume = id.pricePerVolume - id.pricePerVolume * 0.5;
		} else if (id.volume > 10) {
			pricePerVolume = trucker.pricePerVolume - id.pricePerVolume * 0.3;
		} else if (id.volume > 5) {
			pricePerVolume = id.pricePerVolume - id.pricePerVolume * 0.1;
		}
		
		
		delivery.price += delivery.volume * pricePerVolume;
		
		if (delivery.options.deductibleReduction == true ){ //deductible option
			delivery.price += delivery.volume;
		}
	}
	else{
		console.log("Some id hasn't been found");
		return;
	}
	
}

//Exercise3
function computeCommission(){ //We compute the comissions for each actor (except customer of course)
	deliveries.forEach(function(delivery){
		var com = delivery.price * 0.3;
		delivery.commission.insurance = com*0.5;
		delivery.commission.treasury = Math.ceil(delivery.distance/500);
		delivery.commission.convargo = com - delivery.commission.insurance - delivery.commission.treasury;
	});
}


 //Exercise 5
function paymentTime(){ //
	actors.forEach(function(actor){
		var delivery = getDeliveryId(actor.rentalId);
		actor.payment.forEach(function(actor){
			
			if (actor.who == 'shipper'){ //we could also have used a switch case here
				actor.amount = delivery.price; //already contains price + possible deduction
			}
			if (actor.who == 'owner'){ //is owner the trucker ??
				actor.amount = delivery.price - delivery.commission.insurance - delivery.commission.treasury - 												delivery.commission.convargo;
			}
			if (actor.who == 'insurance'){
				actor.amount = delivery.commission.insurance;
			}
			if (actor.who == 'convargo'){
				actor.amount = delivery.commission.convargo + delivery
				if (delivery.options.deductibleReduction){
				actor.amount += delivery.volume;
				}
			}
		});
	});
}



// "Main"
deliveries.forEach(function(delivery){
	computeShippingPrice(delivery);
});
computeCommission();
paymentTime();


//###Final logs###
console.log("i forked the project early before the course, so some values might be different from others projects");
console.log("");
console.log("Prices computations after my functions:");
console.log("Truckers Array:");
console.log(truckers);
console.log("Deliveries Array:");
console.log(deliveries);
console.log("Actors Array:");
console.log(actors);




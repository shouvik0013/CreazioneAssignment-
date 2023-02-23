const company = {
    name: 'CREAZIONE SERVICES PRIVATE LIMITED',
    age: 4,
    city: 'Kolkata',
    cin: 'U74999WB2019PTC231104',
};

// * METHOD 1
// This will return the values of the specified object's properties
const arr1 = Object.values(company);
console.log(arr1);
/**
 * 	[
		'CREAZIONE SERVICES PRIVATE LIMITED',
		4,
		'Kolkata',
		'U74999WB2019PTC231104'
	]
 */

// * METHOD 2
// This will return key value pairs
const myArray2 = Object.entries(company);
console.log(myArray2);
/**
 * 	[
		[ 'name', 'CREAZIONE SERVICES PRIVATE LIMITED' ],
		[ 'age', 4 ],
		[ 'city', 'Kolkata' ],
		[ 'cin', 'U74999WB2019PTC231104' ]
	]
 */

//* METHOD 3
// This will return the keys of the specified object
const arr3 = Object.keys(company);
console.log(arr3);
/** [ 'name', 'age', 'city', 'cin' ] */

//* METHOD 4
const arr4 = arr3.map((key) => {
    return company[key];
});

console.log(arr4);
/**
 * 	[
		'CREAZIONE SERVICES PRIVATE LIMITED',
		4,
		'Kolkata',
		'U74999WB2019PTC231104'
	]
 */

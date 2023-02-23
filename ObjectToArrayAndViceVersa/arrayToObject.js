const arr1 = [
    ['name', 'CREAZIONE SERVICES PRIVATE LIMITED'],
    ['age', 4],
    ['city', 'Kolkata'],
    ['cin', 'U74999WB2019PTC231104'],
];

//* METHOD 1
const entries = new Map(arr1);
console.log(entries)
const obj1 = Object.fromEntries(entries);

console.log(obj1);
/**
 * 	{
	name: 'CREAZIONE SERVICES PRIVATE LIMITED',
	age: 4,
	city: 'Kolkata',
	cin: 'U74999WB2019PTC231104'
	}
 */

//* METHOD 2
const obj2 = {};
arr1.forEach((element) => {
    obj2[element[0]] = element[1];
});

console.log(obj2);
/**
 * 	{
	name: 'CREAZIONE SERVICES PRIVATE LIMITED',
	age: 4,
	city: 'Kolkata',
	cin: 'U74999WB2019PTC231104'
	}
 */

const arr2 = [
    'CREAZIONE SERVICES PRIVATE LIMITED',
    4,
    'Kolkata',
    'U74999WB2019PTC231104',
];

//* METHOD 3
const obj3 = {};
Object.assign(obj3, arr2);
console.log(obj3);
/**
 * 	{
		'0': 'CREAZIONE SERVICES PRIVATE LIMITED',
		'1': 4,
		'2': 'Kolkata',
		'3': 'U74999WB2019PTC231104'
	}
 */

//* METHOD 4
const obj4 = arr2.reduce((obj, currentValue, currentIndex) => {
    obj[currentIndex] = currentValue;
    return obj;
}, {});

console.log('Object 4', obj4);
/**
 * 	{
		'0': 'CREAZIONE SERVICES PRIVATE LIMITED',
		'1': 4,
		'2': 'Kolkata',
		'3': 'U74999WB2019PTC231104'
	}
 */

var primecache = [2,3,5];

function isPrime(x, primes){
	if(!primes){ primes = primecache; }
	if(determineIfPrimeFromList(x, primes)){
		return true;
	}
	if(isCacheLongEnoughForAnswer(x, primes)){
		return false;
	}
	else{
		return isPrime(x, incrementPrimeListFor(x, primes));
	}
}

function isCacheLongEnoughForAnswer(x, primes){
	return (Math.sqrt(x) < (primes[primes.length-1]));
}
function incrementPrimeListFor(x, primes){
	var i = primes[primes.length-1]+1;
	while(!isCacheLongEnoughForAnswer(x, primes)){
		if(determineIfPrimeFromList(i,primes)){
			primes.push(i);
			if((x%i)===0){
				return primes;
			}
		}
		i++;
	}
	return primes;
}
function determineIfPrimeFromList(x, primes){
	for(var i=0;i<primes.length;i++){
		if(x === primes[i]){
			return true;
		}
		else if((x%primes[i])===0){
			return false;
		}
	}
	return true;
}

function tests(){
	var assert = require('assert');
	assert.equal(determineIfPrimeFromList(5, [2,3,5,7]), true, "determineIfPrimeFromList with prime number in list");
	assert.equal(determineIfPrimeFromList(4, [2,3,5,7]), false, "determineIfPrimeFromList with nonprime number less than last");
	assert.equal(determineIfPrimeFromList(14, [2,3,5,7]), false, "determineIfPrimeFromList with nonprime number greater than last");
	assert.equal(determineIfPrimeFromList(11, [2,3,5]), true, "determineIfPrimeFromList with prime number greater than last");
	assert.deepEqual(incrementPrimeListFor(11, [2]), [2,3,5], "incrementPrimeListFor Test 1 Result="+incrementPrimeListFor(11, [2]));
	assert.deepEqual(incrementPrimeListFor(15, [2,3]), [2,3,5], "incrementPrimeListFor Test 2 Result="+incrementPrimeListFor(15, [2,3]));
	assert.deepEqual(incrementPrimeListFor(16, [2,3]), [2,3,5], "incrementPrimeListFor Test 3 Result="+incrementPrimeListFor(16, [2,3]), [2,3,5,7]);
	assert.equal(isCacheLongEnoughForAnswer(3, [2]),true, "isCacheLongEnoughForAnswer Test 1");
	assert.equal(isCacheLongEnoughForAnswer(7, [2,3,5]),true, "isCacheLongEnoughForAnswer Test 2");
	assert.equal(isCacheLongEnoughForAnswer(67, [2,3,5]),false, "isCacheLongEnoughForAnswer Test 3");
	assert.equal(isCacheLongEnoughForAnswer(5, [2,3]),true, "isCacheLongEnoughForAnswer Test 4");
	assert.equal(isCacheLongEnoughForAnswer(17, [2,3]),false, "isCacheLongEnoughForAnswer Test 5");
	assert.equal(isCacheLongEnoughForAnswer(157, [2,3,5,7]),false, "isCacheLongEnoughForAnswer Test 6");
	var yes_primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997,1009,1013,1019,1021,1031,1033,1039,1049,1051,1061,1063,1069,1087,1091,1093,1097,1103,1109,1117,1123,1129,1151,1153,1163,1171,1181,1187,1193,1201,1213,1217,1223,1229,1231,1237,1249,1259,1277,1279,1283,1289,1291,1297,1301,1303,1307,1319,1321,1327,1361,1367,1373,1381,1399,1409,1423,1427,1429,1433,1439,1447,1451,1453,1459,1471,1481,1483,1487,1489,1493,1499,1511,1523,1531,1543,1549,1553,1559,1567,1571,1579,1583,1597,1601,1607,1609,1613,1619,1621,1627,1637,1657,1663,1667,1669,1693,1697,1699,1709,1721,1723,1733,1741,1747,1753,1759,1777,1783,1787,1789,1801,1811,1823,1831,1847,1861,1867,1871,1873,1877,1879,1889,1901,1907,1913,1931,1933,1949,1951,1973,1979,1987,1993,1997,1999,2003,2011,2017,2027,2029,2039,2053,2063,2069,2081,2083,2087,2089,2099,2111,2113,2129,2131,2137,2141,2143,2153,2161,2179];
	yes_primes.forEach(function(item){
		assert.equal(isPrime(item),true, "isPrime " + item);
	});
	var non_primes = [4,6,8,9,10,12,14,15,16,18,20,21,22,24,25,26,27,28,20,32,33,34,35,36,38,39,40,42,44,45,46,48,49,50,52,54,55,56,57,58,60];
	non_primes.forEach(function(item){
		assert.equal(isPrime(item),false, "isPrime " + item);
	});
}

tests();
//console.log(isPrime(163982372679));
module.exports = { isPrime: isPrime };
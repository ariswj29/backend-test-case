// Soal : Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT

function countWordInArray(input, query) {
  const result = [];
  query.map((word) => {
    const count = input.filter((item) => item === word).length;
    result.push(count);
  });

  return result;
}

const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];
// OUTPUT = [1, 0, 2] karena kata 'bbb' terdapat 1 pada INPUT, kata 'ac' tidak ada pada INPUT, dan kata 'dz' terdapat 2 pada INPUT
console.log(countWordInArray(INPUT, QUERY));

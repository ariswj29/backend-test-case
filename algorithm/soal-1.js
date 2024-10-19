// Soal : Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"

function reverseAlphabet(str) {
  const reverse = str.split("").reverse().join("");
  const alphabet = reverse.replace(/[0-9]/g, "");
  const number = reverse.replace(/[A-Z]/g, "");
  return alphabet + number;
}

console.log(reverseAlphabet("NEGIE1"));

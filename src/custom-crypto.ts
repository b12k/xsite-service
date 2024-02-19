function getStrCharCodes(str: string) {
  return str.split('').map((char) => char.charCodeAt(0));
}
function getCharCodesStr(nums: Array<number>) {
  return nums.map((num) => String.fromCharCode(num)).join('');
}
function chunkStr (str: String, chunkSize = 2): Array<string> {
  const regExp = new RegExp(`.{1,${chunkSize}}`, 'g');
  return str.match(regExp) || [];
}
function getRandInt(max: number) {
  return Math.floor(Math.random() * max);
}
function getRandCharPair () {
  return Math.random().toString(36).substring(2, 4);
}
function reverseStr(str: string) {
  return str.split('').reverse().join('');
}
function obfuscateNums(nums: Array<number>) {
  return nums.map((num) => {
    const inc = getRandInt(num);
    return Number(`${num + inc}.${reverseStr(inc.toString())}`);
  });
}
function deObfuscateNums(nums: Array<number>) {
  return nums.map((obfuscatedNum) => {
    const [numStr, incStr = '0'] = obfuscatedNum.toString().split('.');
    const num = Number(numStr);
    const inc = Number(reverseStr(incStr));
    return num - inc;
  });
}
function obfuscateStr(str: string) {
  const reversedBase64Str = btoa(str).split('').reverse().join('');
  const chunks = chunkStr(reversedBase64Str);
  const bloatedChunks = chunks.map((chunk) => [chunk, getRandCharPair()]).flat();
  return bloatedChunks.join('');
}
function encode(str: string) {
  const codes = getStrCharCodes(str);
  const obfuscatedCodes = obfuscateNums(codes);
  const jsonCodes = JSON.stringify(obfuscatedCodes);
  return btoa(jsonCodes);
}

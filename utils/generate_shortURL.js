//params: input the length of shortURL ruled by the project requirement
function generateShortURL(lengthOfShortURL) {

  //step1: list the array consisting all possible characters
  const possibleNumbers = '0123456789'
  const possibleUpperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const possibleLowerLetters = possibleUpperLetters.toLowerCase()
  const allPossibleCharacters = (possibleNumbers + possibleUpperLetters + possibleLowerLetters).split('') //an array 62 in length

  //step2: execute for-loop for 5 times; randomly pick a character each time and put the picked character into the shortURL string
  let shortURL = ''
  for (let i = 1; i <= lengthOfShortURL; i++) {
    const randomIndex = Math.floor(Math.random() * allPossibleCharacters.length) //number 0-61
    shortURL += allPossibleCharacters[randomIndex]
  }

  return shortURL

}

module.exports = generateShortURL
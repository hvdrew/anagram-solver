/**
 * TODO:
 *  - Fix formatting
 *  - Clean up input (remove spaces, lower case, symbol etc)
 *  - Conditionally render different groups of word matches,
 *  if no matches of a certain length then skip that section
 *  - Throw away any single or double letter words
 */


const words = require('check-word')('en');
const inquirer = require('inquirer');

let questions = [
    {
        type: 'input',
        name: 'available_letters',
        message: 'What letters are available?'
    }
];

inquirer.prompt(questions).then((answers) => {
    let possibleLetters = answers.available_letters.toLowerCase();

    let lettersArray = possibleLetters.split('');

    findPossibilities(lettersArray);
});

let letters = '';

lettersArray = letters.split('');

const tree = function(leafs) {
    let branches = [];      
    if( leafs.length == 1 ) return leafs;       
    for( let k in leafs ) {
        let leaf = leafs[k];
        tree(leafs.join('').replace(leaf,'').split('')).concat("").map(function(subtree) {
            branches.push([leaf].concat(subtree));
        });
    }
    return branches;
};

const findPossibilities = (arrayOfLetters) => {
    let attempts = tree(arrayOfLetters);
    let results = [];
    let possibleSolutions = {
        threeChar: [],
        fourChar: [],
        fiveChar: [],
        sixChar: [],
        sevenChar: [],
        eightChar: [],
        nineChar: [],
        tenChar: []
    };
    
    attempts.forEach((item) => {
        let word = item.join('');
        if (words.check(word) && results.indexOf(word) == -1) {
            results.push(word);
        }
    });
    
    results.forEach((item) => {
        switch (item.length) {
            case 3:
                possibleSolutions.threeChar.push(item);
                break;
            case 4:
                possibleSolutions.fourChar.push(item);
                break;
            case 5:
                possibleSolutions.fiveChar.push(item);
                break;
            case 6:
                possibleSolutions.sixChar.push(item);
                break;
            case 7:
                possibleSolutions.sevenChar.push(item);
                break;
            case 8:
                possibleSolutions.eightChar.push(item);
                break;
            case 9:
                possibleSolutions.nineChar.push(item);
                break;
            case 10:
                possibleSolutions.tenChar.push(item);
                break;
            default:
                break;
        }
    });
    
    let resultText = `
    Possible Solutions found.
    
    Three Letters:
    ${(possibleSolutions.threeChar.length > 0) ? possibleSolutions.threeChar : 'None.'}
    
    Four Letters:
    ${(possibleSolutions.fourChar.length > 0) ? possibleSolutions.fourChar : 'None.'}
    
    Five Letters:
    ${(possibleSolutions.fiveChar.length > 0) ? possibleSolutions.fiveChar : 'None.'}
    
    Six Letters:
    ${(possibleSolutions.sixChar.length > 0) ? possibleSolutions.sixChar : 'None.'}
    
    Six Letters:
    ${(possibleSolutions.sevenChar.length > 0) ? possibleSolutions.sevenChar : 'None.'}
    
    Six Letters:
    ${(possibleSolutions.eightChar.length > 0) ? possibleSolutions.eightChar : 'None.'}`;
    
    console.log(resultText);
}


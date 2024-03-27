'use strict';

// consider OO with proper design pattern
class StringTools {
  constructor(initialString) {
    if (!new RegExp(/^[a-z]+$/).test(initialString)) {
      throw new TypeError(`invalid input ${initialString}, input can only contain alphabet characters a-z`);
    }
    this.initialString = initialString;
    this.currentString = initialString;
    this.lastString = null;
    this.finalString = null;
  }

  // For a given string that only contains alphabet characters a-z, if 3 or more consecutive characters are identical, remove them from the string. Repeat this process until there is no more than 3 identical characters sitting besides each other.
  consecutiveCharactersFilter() {
    const currentString = this.currentString;
    const currentStringLength = currentString.length;
    let targetCharactersArray = [];
    const lastState = {
      character: '',
      number: 0
    };
    let positionOfIteration = -1;
    for (const c of currentString) {
      ++positionOfIteration;
      if (lastState.number === 0) {
        // first iteration
        lastState.character = c;
        ++lastState.number;
        if (currentStringLength === 1) {
          // specially handle the single-character string
          targetCharactersArray.push(c);
        }
      } else {
        if (c === lastState.character) {
          // same character as the last iteration
          ++lastState.number;
        } else {
          if (lastState.number < 3) {
            // 2 or less consecutive characters are identical
            targetCharactersArray.push(lastState.character.repeat(lastState.number));
          }
          lastState.character = c;
          lastState.number = 1;
        }
        // handle the last iteration
        if (positionOfIteration === currentStringLength - 1) {
          if (lastState.number < 3) {
            // 2 or less consecutive characters are identical
            targetCharactersArray.push(lastState.character.repeat(lastState.number));
          }
        }
      }
    }
    const targetCharacters = targetCharactersArray.join('');
    this.currentString = targetCharacters;
    return targetCharacters;
  }

  // call consecutiveCharactersFilter recursively
  recursiveConsecutiveCharactersFilter() {
    const targetCharacters = this.consecutiveCharactersFilter();
    if (this.lastString !== targetCharacters) {
      this.lastString = targetCharacters;
      console.log(targetCharacters);
      return this.recursiveConsecutiveCharactersFilter();
    } else {
      this.finalString = targetCharacters;
      return targetCharacters;
    }
  }

  // Instead of removing the consecutively identical characters, replace them with a single character that comes before it alphabetically.
  consecutiveCharactersReplacer() {
    const currentString = this.currentString;
    const currentStringLength = currentString.length;
    let targetCharactersArray = [];
    const lastState = {
      character: '',
      number: 0
    };
    let positionOfIteration = -1;
    for (const c of currentString) {
      ++positionOfIteration;
      if (lastState.number === 0) {
        // first iteration
        lastState.character = c;
        ++lastState.number;
        if (currentStringLength === 1) {
          // specially handle the single-character string
          targetCharactersArray.push(c);
        }
      } else {
        if (c === lastState.character) {
          // same character as the last iteration
          ++lastState.number;
        } else {
          if (lastState.number < 3) {
            // 2 or less consecutive characters are identical
            targetCharactersArray.push(lastState.character.repeat(lastState.number));
          } else {
            // 3 or more consecutive characters are identical, replace them with a single character that comes before it alphabetically.
            const lastCharacterCode = lastState.character.charCodeAt(0);
            if (lastCharacterCode > 97 && lastCharacterCode < 123) {
              targetCharactersArray.push(String.fromCharCode(lastCharacterCode - 1));
            }
          }
          lastState.character = c;
          lastState.number = 1;
        }
        // handle the last iteration
        if (positionOfIteration === currentStringLength - 1) {
          if (lastState.number < 3) {
            // 2 or less consecutive characters are identical
            targetCharactersArray.push(lastState.character.repeat(lastState.number));
          } else {
            // 3 or more consecutive characters are identical, replace them with a single character that comes before it alphabetically.
            const lastCharacterCode = lastState.character.charCodeAt(0);
            if (lastCharacterCode > 97 && lastCharacterCode < 123) {
              targetCharactersArray.push(String.fromCharCode(lastCharacterCode - 1));
            }
          }
        }
      }
    }
    const targetCharacters = targetCharactersArray.join('');
    this.currentString = targetCharacters;
    return targetCharacters;
  }

  // call consecutiveCharactersReplacer recursively
  recursiveConsecutiveCharactersReplacer() {
    const targetCharacters = this.consecutiveCharactersReplacer();
    if (this.lastString !== targetCharacters) {
      this.lastString = targetCharacters;
      console.log(targetCharacters);
      return this.recursiveConsecutiveCharactersReplacer();
    } else {
      this.finalString = targetCharacters;
      return targetCharacters;
    }
  }
}

export default StringTools;

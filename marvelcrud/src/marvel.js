
import md5 from 'md5';

export const public_key= "18f003eca8be7342a9b8d88e5a8b0b22";
export const private_key= "981436151b01934bfb52fe074110ffac43b387e0";

export const ts = Date.now();
export const hash = md5(ts + private_key + public_key);

export var myCharacters = [];

export function populatemyCharacters(values) {
    myCharacters.push(values)
  }
export function setmyCharacters(values) {
    myCharacters = values
  }  
export function getmyCharacters() {
    myCharacters.forEach(character => {
      if(!character.description){
        character.description = "No description available.";
      }
    });  
    return myCharacters.sort(function(a, b) {
        return b.id - a.id;
      });
  }  

export default {
    populatemyCharacters,
    getmyCharacters,
    setmyCharacters
}



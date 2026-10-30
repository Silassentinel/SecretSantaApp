import { randomInt } from 'crypto';

const  shuffle =(array : string []) => {
    let currentIndex : number = array.length
    let randomIndex : number= 0;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = randomInt(currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

export default shuffle;
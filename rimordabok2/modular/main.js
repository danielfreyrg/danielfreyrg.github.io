import fetchWords from '/fetchWords.js';
import { findEndRhymes, findInnerRhymes, findStartRhymes } from '/rhymeFinder.js';
import { updateRhymeList, displayError } from '/domUtils.js';

const main = async () => {
  try {
    const words = await fetchWords('api/words');
    const endRhymes = findEndRhymes(words);
    const innerRhymes = findInnerRhymes(words);
    const startRhymes = findStartRhymes(words);
    // ...use the found rhymes...
    updateRhymeList(endRhymes);
    // ...update for other rhymes...
  } catch (error) {
    displayError(error.message);
  }
};

main();

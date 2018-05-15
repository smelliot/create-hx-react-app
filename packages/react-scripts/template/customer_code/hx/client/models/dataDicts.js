import dataDictExample from './example/dataDictExample';

const dataDicts = {
  0: dataDictExample,
};

// This function takes a path and a dictionary and returns the object containing mapped to the object at the end of that path
// You can give it a full path or just a name, i.e. identifier after the last slash. The main thing is that you don't give it a child of a nested item - it needs the whole identifier at the leaf of the path. So:
// /a/b/c and /a/b/c.d are fine
// c and c.d are fine
// d is not fine (it needs to follow c to d)
// This function follows the path as far as it will go, so in the above example, if you give it /a/b/c and c has two views, the object containing both of those will be returned. So you need to give it a valid path to the leaf view object!
// TO DO: Because of the complex object structure of a repeat, this has some weird behaviour if you try and read a repeat (you can follow some paths that don't get you to a view object!). Work to do to error trap this and make it more useful for repeats (possible via true recursion rather than reduce)
export function readDictionary(dict, path) {
  // Get name from end of path
  const name = path.split('/').pop();
  // Split the name into parts if it's nested, and recurse through the dictionary to find the leaf object
  const dictEntry = name.split('.').reduce((acc, el) => acc[el], dict);
  return dictEntry;
}

export default dataDicts;

export function removeFormList (list, index) {
    const result = [...list];
    const [removed] = result.splice(index, 1);
    return [result, removed];
  };
  
  export function addToList (list, index, element) {
    const result = [...list];
    result.splice(index, 0, element);
    return result;
  };
  
  export function objectToArray (obj) {
    const arrayedObject = Object.values(obj);
    let array;

    if (arrayedObject.length === 0) {
      array= arrayedObject;
      return array
    } else {
      array = arrayedObject.reduce((acc, cur) => {
        return [...acc, ...cur];
      });
     return array
    };
  };
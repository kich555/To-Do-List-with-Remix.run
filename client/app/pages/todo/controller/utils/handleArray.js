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
  
    if (arrayedObject.length === 0) {
      return arrayedObject;
    } else {
      arrayedObject.reduce((acc, cur) => {
        return [...acc, ...cur];
      });
    }
  
    return arrayedObject;
  };
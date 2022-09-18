import { json, redirect } from '@remix-run/node';

export const badRequest = data => json(data, { status: 400 });

function handleIsStringType(value) {
    
    if (typeof value !== 'string') {
        
      return badRequest({
        formError: `The data type of ${value} must be string.`,
      });
    }
  }

export function validateStringInputType({ ...values }) {
    const arrayedObj = Object.keys(values);
    
    return arrayedObj.forEach(handleIsStringType);
  }
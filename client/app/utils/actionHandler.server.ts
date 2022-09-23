import { json, redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';

interface AuthFields {
  username?: string | undefined;
  password?: string | undefined;
  confirmPassword?: string | undefined;
}

export interface AuthBadRequestResponse {
  fields?: AuthFields;
  formError?: string;
  fieldErrors?: AuthFields;
}

export const badRequest = (data: AuthBadRequestResponse) => json(data, { status: 400 });

function handleIsStringType(value: string) {
  // invariant(typeof value === 'string', `${value} must be a string`);
  return badRequest({
    formError: `The data type of ${value} must be a string.`,
  });
}

export function validateStringInputType({ ...values }) {
  const arrayedObj = Object.keys(values);

  return arrayedObj.forEach(handleIsStringType);
}

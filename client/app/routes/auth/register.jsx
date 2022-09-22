import { Form, useActionData } from '@remix-run/react';
import { useEffect } from 'react';
import { checkUser } from '~/models/user.server';
import { Button, Input, Space } from '@mantine/core';
import { badRequest, validateStringInputType } from '~/utils/actionHandler.server';
import { validateUsername, validatePassword } from '~/pages/auth/controller/utils/authUtils';
import authStyles from '~/pages/auth/styles/authStyles';
import { register, createUserSession } from '~/utils/session.server';
import { useAuthUX } from '~/pages/auth/controller/context/AuthUXProvider';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const fields = Object.fromEntries(formData);
  const { username, password, confirmPassword } = fields;
  const redirectTo = '/todos';
  // create confirm password field error message
  const confirmPasswordFieldError = `Password did not match. Please try again.`;

  // check password confirmed
  if (password !== confirmPassword) {
    console.log('isIn?? -->');
    const fieldErrors = {
      confirmPassword: confirmPasswordFieldError,
    };
    return badRequest({ fieldErrors, fields });
  }

  // check input type is string
  validateStringInputType(fields);

  // create field error message
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  // check field has any error
  const arrayedObj = Object.values(fieldErrors);

  if (arrayedObj.some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }
  // check user exist
  const userExists = await checkUser(username);

  if (userExists) {
    return badRequest({
      fields,
      formError: `User with username ${username} already exists`,
    });
  }

  const user = await register({ username, password });
  if (!user) {
    return badRequest({
      fields,
      formError: `Something went wrong trying to create a new user.`,
    });
  }

  // create the user
  // create their session and redirect to /todos

  return createUserSession(user.id, redirectTo);
};

export default function RegisterRoute(params) {
  const actionData = useActionData();
  const { classes } = authStyles();
  const { label, input, errorInput, errorMessage, button } = classes;
  const [, , setActionData] = useAuthUX();
  console.log('actionData', actionData);
  useEffect(() => {
    if (!actionData) return;
    setActionData(actionData);
  }, [setActionData, actionData]);

  return (
    <>
      <Form method="post">
        <Space h={20} />
        <Input.Label htmlFor="username-input" mt={4} className={label}>
          <Input
            id="username-input"
            name="username"
            type="text"
            defaultValue={actionData?.fields?.username}
            aria-label="username"
            aria-invalid={Boolean(actionData?.fieldErrors?.username) || Boolean(actionData?.formError)}
            aria-errormessage={((actionData?.fieldErrors?.username || actionData?.formError?.includes('username')) && 'username-error') || (actionData?.formError && 'network-error')}
            placeholder="username"
            className={input}
            styles={{ input: (actionData?.fieldErrors?.username || actionData?.formError) && errorInput }}
          />
          <Input.Error className={errorMessage}>{actionData?.fieldErrors?.username || actionData?.formError} </Input.Error>
        </Input.Label>
        <Input.Label htmlFor="password-input" mt={4} className={label}>
          <Input
            id="password-input"
            name="password"
            type="password"
            defaultValue={actionData?.fields?.password}
            aria-label="password"
            aria-invalid={Boolean(actionData?.fieldErrors?.password) || Boolean(actionData?.formError)}
            aria-errormessage={actionData?.fieldErrors?.password && 'password-error'}
            placeholder="password"
            className={input}
            styles={{ input: (actionData?.fieldErrors?.password || actionData?.formError) && errorInput }}
          />
          <Input.Error className={errorMessage}>{actionData?.fieldErrors?.password || actionData?.formError?.includes('wrong')} </Input.Error>
        </Input.Label>
        <Input.Label htmlFor="confirm-password-input" mt={4} className={label}>
          <Input
            id="confirm-password-input"
            name="confirmPassword"
            type="password"
            defaultValue={actionData?.fields?.confirmPassword}
            aria-label="confirm-password"
            aria-invalid={Boolean(actionData?.fieldErrors?.confirmPassword) || Boolean(actionData?.formError)}
            aria-errormessage={actionData?.fieldErrors?.confirmPassword && 'password-error'}
            placeholder="confirm password"
            className={input}
            styles={{ input: (actionData?.fieldErrors?.confirmPassword || actionData?.formError) && errorInput }}
          />
          <Input.Error className={errorMessage}>{actionData?.fieldErrors?.confirmPassword} </Input.Error>
        </Input.Label>
        <Button type="submit" variant="gradient" className={button} mt={8}>
          Register
        </Button>
        <Space h={60} />
      </Form>
    </>
  );
}

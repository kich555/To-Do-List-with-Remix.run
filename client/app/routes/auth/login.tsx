import { Form, useActionData } from '@remix-run/react';
import { login, createUserSession } from '~/utils/session.server';
import { Button, Input, Space } from '@mantine/core';
import authStyles from '~/pages/auth/styles/authStyles';
import { validateUsername, validatePassword } from '~/pages/auth/controller/utils/authUtils';
import { AuthBadRequestResponse, badRequest, validateStringInputType } from '~/utils/actionHandler.server';
import { useAuthUX } from '~/pages/auth/controller/context/AuthUXProvider';
import { useEffect } from 'react';
import type { ActionArgs } from '@remix-run/node';
import invariant from 'tiny-invariant';

export interface LoginActionData {
  username: string;
  password: string;
}

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const { username, password } = Object.fromEntries(formData);
  // const { username, password } = fields;
  const redirectTo = '/todos';

  invariant(typeof username === 'string', `${username} must be a string`);
  invariant(typeof password === 'string', `${password} must be a string`);
  // check input type is string
  validateStringInputType({ username, password });

  // create field error message
  const fieldErrors: LoginActionData = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  // check field has any error
  const arrayedObj = Object.values(fieldErrors);
  if (arrayedObj.some(Boolean)) {
    return badRequest({ fieldErrors, ...{ username, password } });
  }

  const user = await login({ username, password });

  if (!user) {
    return badRequest({
      fields: { username, password },
      formError: `Username/Password combination is incorrect`,
    });
  }

  return createUserSession(user.id, redirectTo);
};

export default function LoginRoute() {
  const actionData = useActionData() as AuthBadRequestResponse;
  const { classes } = authStyles();
  const { label, input, errorInput, errorMessage, button } = classes;
  const { setActionData } = useAuthUX();

  useEffect(() => {
    if (!actionData) return;
    setActionData(actionData);
  }, [setActionData, actionData]);

  return (
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
          aria-errormessage={(actionData?.fieldErrors?.username && 'username-error') || (actionData?.formError && 'User does not exist.')}
          placeholder="username"
          className={input}
          //@ts-ignore
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
          aria-errormessage={(actionData?.fieldErrors?.password && 'password-error') || (actionData?.formError && 'User does not exist.')}
          placeholder="password"
          className={input}
          //@ts-ignore
          styles={{ input: (actionData?.fieldErrors?.password || actionData?.formError) && errorInput }}
        />
        <Input.Error className={errorMessage}>{actionData?.fieldErrors?.password || actionData?.formError} </Input.Error>
      </Input.Label>
      <Button type="submit" variant="gradient" className={button} mt={8}>
        Log in
      </Button>
      <Space h={60} />
    </Form>
  );
}

import { Button, Input, Space } from '@mantine/core';
import { Form, useActionData } from '@remix-run/react';
import authStyles from '~/styles/auth/authstyles';
import { badRequest, validateStringInputType } from '~/utils/actionHandler.server';
import { login, createUserSession } from '~/utils/session.server';

function validateUsername(username) {
  if (typeof username !== 'string' || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password) {
  if (typeof password !== 'string' || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const fields = Object.fromEntries(formData);
  const { username, password } = fields;
  const redirectTo = '/todos';

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

  const user = await login({ username, password });

  if (!user) {
    return badRequest({
      fields,
      formError: `Username/Password combination is incorrect`,
    });
  }
  return createUserSession(user.id, redirectTo);
};

export default function LoginRoute() {
  const actionData = useActionData();
  const { classes } = authStyles();
  const { label, input, errorInput, errorMessage, button } = classes;

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
          aria-invalid={Boolean(actionData?.fieldErrors?.username)}
          aria-errormessage={actionData?.fieldErrors?.username && 'username-error'}
          placeholder="username"
          className={input}
          styles={{ input: actionData?.fieldErrors?.username && errorInput }}
        />
        <Input.Error className={errorMessage}>{actionData?.fieldErrors?.username} </Input.Error>
      </Input.Label>
      <Input.Label htmlFor="password-input" mt={4} className={label}>
        <Input
          id="password-input"
          name="password"
          type="password"
          defaultValue={actionData?.fields?.password}
          aria-label="password"
          aria-invalid={Boolean(actionData?.fieldErrors?.password)}
          aria-errormessage={actionData?.fieldErrors?.password && 'password-error'}
          placeholder="password"
          className={input}
          styles={{ input: actionData?.fieldErrors?.password && errorInput }}
        />
        <Input.Error className={errorMessage}>{actionData?.fieldErrors?.password} </Input.Error>
      </Input.Label>
      <Button type="submit" variant="gradient" className={button} mt={8}>
        Log in
      </Button>
      <Space h={60} />
    </Form>
  );
}

import { Button, Input, Space } from '@mantine/core';
import { json, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import authStyles from '~/pages/auth/styles/authStyles';
import { badRequest, validateStringInputType } from '~/utils/actionHandler.server';
import { checkUser } from '~/models/user.server';
import { validateUsername, validatePassword } from '~/pages/auth/utils/authUtils';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const fields = Object.fromEntries(formData);
  const { username, password, confirmPassword } = fields;

  // create confirm password field error message
  const confirmPasswordFieldError = `Password did not match. Please try again.`;
  // check password confirmed
  if (password !== confirmPassword) {
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
    confirmPassword: confirmPasswordFieldError,
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

  // create the user
  // create their session and redirect to /todos

  return redirect('/auth/login');
};

export default function RegisterRoute(params) {
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
      <Input.Label htmlFor="confirm-password-input" mt={4} className={label}>
        <Input
          id="confirm-password-input"
          name="confirmPassword"
          type="password"
          defaultValue={actionData?.fields?.confirmPassword}
          aria-label="confirm-password"
          aria-invalid={Boolean(actionData?.fieldErrors?.confirmPassword)}
          aria-errormessage={actionData?.fieldErrors?.confirmPassword && 'password-error'}
          placeholder="confirm password"
          className={input}
          styles={{ input: actionData?.fieldErrors?.confirmPassword && errorInput }}
        />
        <Input.Error className={errorMessage}>{actionData?.fieldErrors?.confirmPassword} </Input.Error>
      </Input.Label>
      <Button type="submit" variant="gradient" className={button} mt={8}>
        Register
      </Button>
      <Space h={60} />
    </Form>
  );
}

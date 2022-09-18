import { Button, Input, Space } from '@mantine/core';
import { json } from '@remix-run/node';
import { Form } from '@remix-run/react';

const badRequest = data => {
  json(data, { status: 400 });
};

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

const validateStringInputType = ({ ...values }) => {
  const arrayedObj = Object.keys(values);
  arrayedObj.map(value => {
    if (typeof value !== 'string') {
      return badRequest({
        formError: `${value}'s should be a string type`,
      });
    }
  });
};

export const action = async ({ request }) => {
  const formData = request.formData();
  const values = Object.fromEntries(formData);
  const { username, password } = values;
  validateStringInputType(values);
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, values });
  }
};

export default function LoginRoute(params) {
  return (
    <Form method="post">
      <Space h={20} />
      <Input name="username" sx={{ maxWidth: '240px' }} my={8} />
      <Input name="password" type="password" sx={{ maxWidth: '240px' }} my={8} />
      <Button variant="gradient" sx={{ width: '100%', maxWidth: '240px' }} my={8}>
        Log in
      </Button>
      <Space h={60} />
    </Form>
  );
}

import { Button, Input, Space } from '@mantine/core';
import { Form, useActionData } from '@remix-run/react';
import authStyles from '~/pages/auth/styles/authStyles';


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

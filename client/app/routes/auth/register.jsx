import { Button, Input, Space } from '@mantine/core';
import { Form } from '@remix-run/react';

export default function RegisterRoute(params) {
  return (
    <Form method="post">
      <Space h={20} />
      <Input name="id" sx={{ maxWidth: '240px' }} my={8} />
      <Input name="passward" sx={{ maxWidth: '240px' }} my={8} />
      <Input name="passward" sx={{ maxWidth: '240px' }} my={8} />
      <Button variant="gradient" sx={{ width: '100%', maxWidth: '240px' }} my={8}>
        Log in
      </Button>
      <Space h={60} />
    </Form>
  );
}

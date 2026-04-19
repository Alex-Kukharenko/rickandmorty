import { TextInput, Button, Stack, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'

export function Signin({ onSubmit }) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => {
        if (!value) return 'Введите email'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Некорректный email'
        return null
      },
      password: (value) => {
        if (!value) return 'Введите пароль'
        if (value.length < 8) return 'Минимум 8 символов'
        return null
      },
    },
  })

  const handleSubmit = (values) => {
    onSubmit?.(values)
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="sm">
        <TextInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          withAsterisk
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label="Пароль"
          placeholder="••••••••"
          autoComplete="current-password"
          description="Минимум 8 символов"
          withAsterisk
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Button type="submit">Войти</Button>
      </Stack>
    </form>
  )
}


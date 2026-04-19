import { TextInput, PasswordInput, Button, Stack, Radio, Group } from '@mantine/core'
import { useForm } from '@mantine/form'

export function Signup({ onSubmit }) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      username: '',
      email: '',
      gender: '',
      password: '',
      confirm: '',
    },
    validate: {
      name: (v) => (!v ? 'Введите имя' : null),
      username: (v) => {
        if (!v) return 'Введите ник'
        if (v.length < 3) return 'Минимум 3 символа'
        return null
      },
      email: (v) => {
        if (!v) return 'Введите email'
        if (!/\S+@\S+\.\S+/.test(v)) return 'Некорректный email'
        return null
      },
      gender: (v) => (!v ? 'Выберите пол' : null),
      password: (v) => {
        if (!v) return 'Введите пароль'
        if (v.length < 8) return 'Минимум 8 символов'
        return null
      },
      confirm: (v, values) => {
        if (!v) return 'Повторите пароль'
        if (v !== values.password) return 'Пароли не совпадают'
        return null
      },
    },
  })

  const handleSubmit = ({ confirm: _confirm, ...result }) => {
    onSubmit?.(result)
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="sm">
        <TextInput
          label="Имя"
          placeholder="Иван Иванов"
          autoComplete="name"
          withAsterisk
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Ник"
          placeholder="ivan_99"
          autoComplete="username"
          description="Латиница, цифры, нижнее подчёркивание"
          withAsterisk
          key={form.key('username')}
          {...form.getInputProps('username')}
        />
        <TextInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          withAsterisk
          key={form.key('email')}
          {...form.getInputProps('email')}
        />

        <Radio.Group
          label="Пол"
          withAsterisk
          key={form.key('gender')}
          {...form.getInputProps('gender')}
        >
          <Group mt="xs">
            <Radio value="male" label="Мужской" />
            <Radio value="female" label="Женский" />
          </Group>
        </Radio.Group>

        <PasswordInput
          label="Пароль"
          placeholder="••••••••"
          autoComplete="new-password"
          description="Минимум 8 символов"
          withAsterisk
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label="Повторить пароль"
          placeholder="••••••••"
          autoComplete="new-password"
          withAsterisk
          key={form.key('confirm')}
          {...form.getInputProps('confirm')}
        />

        <Button type="submit">Зарегистрироваться</Button>
      </Stack>
    </form>
  )
}


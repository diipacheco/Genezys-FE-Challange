import * as z from "zod";
import Head from "next/head";

import { Input } from "@/components/form/input";
import { Label } from "@/components/form/label";
import { Button } from "@/components/button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/services/signin";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signInForm = z.object({
  email: z.string().email({ message: "Endereço de email incorreto" }),
  password: z.string()
});

type SignInForm = z.infer<typeof signInForm>;

export default function Signin() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>()

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  function handleSignIn({ email, password }: SignInForm) {
    try {
      authenticate({ email, password })
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <Head>
        <title>SignIn</title>
      </Head>

      <div className="w-screen h-screen flex flex-col justify-center items-center gap-6">
        <h1 className="text-xl"><strong>Genezys Autenticação</strong> | Login</h1>
        <div className="w-full max-w-xs">
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="bg-blue-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <Label htmlFor="username">
                Email
              </Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="joe.doe@email.com"
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="password">
                Senha
              </Label>
              <Input
                {...register('password')}
                id="password"
                type="password"
                placeholder="************" />
            </div>
            <div className="flex items-center justify-center">
              <Button
                size="lg"
                type="submit"
                disabled={isSubmitting}
              >
                Entrar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
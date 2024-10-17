import * as z from "zod";
import Head from "next/head";

import { Input } from "@/components/form/input";
import { Label } from "@/components/form/label";
import { Button } from "@/components/button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/services/signup";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signUpForm = z.object({
  fullName: z.string(),
  email: z.string().email({ message: "Endereço de email incorreto" }),
  password: z.string(),
  confirmPassword: z.string(),
  address: z.object({
    street: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    number: z.string(),
    postalCode: z.string()
  }),
}).refine((data) => data.confirmPassword !== data.password, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
});

type SignUpForm = z.infer<typeof signUpForm>;

export default function SignUp() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>()

  const { mutateAsync: registerUser } = useMutation({
    mutationFn: signUp,
  })

  function handleSignUp({ fullName, email, confirmPassword, address }: SignUpForm) {
    try {
      registerUser({ fullName, email, password: confirmPassword, address })
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>

      <div className="w-screen h-screen flex flex-col justify-center items-center gap-6">
        <h1 className="text-xl"><strong>Genezys Autenticação</strong> | Cadastro</h1>

        <Link href='/signin' className="font-medium text-blue-600 cursor-pointer dark:text-blue-500 hover:underline">Login</Link>

        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="bg-blue-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <Label htmlFor="fullName">
                Nome Completo
              </Label>
              <Input
                {...register('fullName')}
                id="email"
                type="string"
                placeholder="Joe Doe"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="email">
                Email
              </Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="joe.doe@email.com"
              />
            </div>

            <div className="flex gap-6">
              <div>
                <div className="mb-4">
                  <Label htmlFor="postalCode">
                    CEP
                  </Label>
                  <Input
                    {...register('address.postalCode')}
                    id="postalCode"
                    type="string"
                  />
                </div>

                <div className="mb-4">
                  <Label htmlFor="street">
                    Rua
                  </Label>
                  <Input
                    {...register('address.street')}
                    id="street"
                    type="string"
                  />
                </div>

                <div className="mb-4">
                  <Label htmlFor="neighborhood">
                    Bairro
                  </Label>
                  <Input
                    {...register('address.neighborhood')}
                    id="neighborhood"
                    type="string"
                  />
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <Label htmlFor="number">
                    Número
                  </Label>
                  <Input
                    {...register('address.number')}
                    id="number"
                    type="string"
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="city">
                    Cidade
                  </Label>
                  <Input
                    {...register('address.city')}
                    id="city"
                    type="string"
                  />
                </div>

                <div className="mb-4">
                  <Label htmlFor="state">
                    Estado
                  </Label>
                  <Input
                    {...register('address.state')}
                    id="state"
                    type="string"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="password">
                Senha
              </Label>
              <Input
                {...register('password')}
                id="password"
                type="password"
                placeholder="************" />
            </div>

            <div className="mb-6">
              <Label htmlFor="confirmPassword">
                Confirmar Senha
              </Label>
              <Input
                {...register('confirmPassword')}
                id="password"
                type="password"
                placeholder="Confirmar Senha"
              />
            </div>

            <div className="flex items-center justify-center">
              <Button
                size="lg"
                type="submit"
                disabled={isSubmitting}
              >
                Cadastrar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
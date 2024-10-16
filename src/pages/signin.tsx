import { Input } from "@/components/form/input";
import { Label } from "@/components/form/label";
import { Button } from "@/components/button";

export default function Signin() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-6">
      <h1 className="text-xl"><strong>Genezys Autenticação</strong> | Signin</h1>
      <div className="w-full max-w-xs">
        <form className="bg-blue-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <Label htmlFor="username">
              Email
            </Label>
            <Input
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
              id="password"
              type="password"
              placeholder="************" />
          </div>
          <div className="flex items-center justify-center">
            <Button
              size="lg"
              type="submit">
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
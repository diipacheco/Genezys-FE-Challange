import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table";
import { api } from "@/lib/axios";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

type User = {
  id: string;
  fullName: string;
  email: string;
  address: {
    street: string
    neighborhood: string
    number: string
    city: string
    state: string
    postalCode: string
  }
}

async function fetchUsers() {
  const response = await api.get<User[]>('/users');
  return response.data;
}

export const getServerSideProps = (async () => {
  const data = await fetchUsers()
  return { props: { users: data } }
}) satisfies GetServerSideProps<{ users: User[] }>

export default function Home({ users }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-6">
      <h1 className="text-xl">Genezys Autenticação | <strong>Tabela de Usuários</strong></h1>

      <div className="w-full max-w-5xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Bairro</TableHead>
              <TableHead>Cep</TableHead>
              <TableHead>Cidade</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address.street}</TableCell>
                <TableCell>{user.address.neighborhood}</TableCell>
                <TableCell>{user.address.postalCode}</TableCell>
                <TableCell>{user.address.city} - {user.address.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
import { postalCodeApi } from "@/lib/axios";

export async function addressByPostalCode(postalCode: string) {
  const data = postalCodeApi.get('search', {
    params: {
      'codes': postalCode
    }
  })
  console.log(data)
} 
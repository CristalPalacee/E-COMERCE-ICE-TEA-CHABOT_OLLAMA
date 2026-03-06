'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// ... fungsi addProduct yang sudah ada ...
export async function addProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const price = parseInt(formData.get('price') as string);
  const image = formData.get('image') as string;
  const category = formData.get('category') as string;

  await prisma.product.create({
    data: { name, price, image, category },
  });

  revalidatePath('/admin');
  revalidatePath('/');
}
// FUNGSI DELETE
export async function deleteProduct(id: number) {
  await prisma.product.delete({
    where: { id }
  })
  revalidatePath('/admin')
  revalidatePath('/')
}

// FUNGSI UPDATE
export async function updateProduct(formData: FormData) {
  const id = parseInt(formData.get('id') as string)
  const name = formData.get('name') as string
  const price = parseInt(formData.get('price') as string)
  const image = formData.get('image') as string
  const category = formData.get('category') as string

  await prisma.product.update({
    where: { id },
    data: { name, price, image, category }
  })

  revalidatePath('/admin')
  revalidatePath('/')
}
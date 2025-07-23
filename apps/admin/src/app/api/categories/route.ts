// app/api/categories/route.ts
import { NextResponse } from 'next/server'
import { generateSlug } from '@/lib/format'
import prisma from "../../../../../../packages/db/index"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, description } = body

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ message: 'Le nom est requis.' }, { status: 400 })
    }

    const slug = generateSlug(name)

    const category = await prisma.category.create({
      data: {
        name,
        description,
        slug,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('[CATEGORY_POST]', error)
    return NextResponse.json(
      { message: 'Erreur lors de la création de la catégorie.', error },
      { status: 500 }
    )
  }
}

import ProductCard from '@/components/ProductCard'
import { prisma } from '@/lib/db/prisma'

export default async function Home() {
  const productas = await prisma.producta.findMany({
  orderBy: { id:"desc"},
});
  return (
   <div>
      <ProductCard producta={productas[0]}/>
   </div>
  )
}


import ProductCard from '@/components/ProductCard'
import { prisma } from '@/lib/db/prisma'
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const productas = await prisma.producta.findMany({
  orderBy: { id:"desc"},
});
  return (
   <div>
     <div className="hero rounded-xl bg-base-200">
       <div className='hero-content flex-col lg:flex-row'>
          <Image 
          src={productas[0].imageUrl}
          alt={productas[0].name}
          width={400}
          height={800}
          className='w-full max-w-sm rounded-lg shadow-2xl'
          priority
          />
          <div>
            <h1 className='text-5xl font-bold'>{productas[0].name}</h1>
            <p className='py-6'>{productas[0].description}</p>
             <Link
              href={"/products/" + productas[0].id}
              className="btn-primary btn"
            >
              Check it out
            </Link>
          </div>
      </div>
     </div>
     <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {productas.slice(1).map(producta => (
        <ProductCard producta={producta} key={producta.id}/>
      ))}
     </div>
   </div>
  )
}


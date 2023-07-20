import PriceTag from "@/components/PriceTag"
import { prisma } from "@/lib/db/prisma"
import { promises } from "dns"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { cache } from "react"

interface ProductPageProps{
    params:{
        id:string
    }
}

const getProducta = cache(async (id: string) => {
const producta = await prisma.producta.findUnique({where:{id}})
    if(!producta) notFound();
    return producta
})

export async function generateMetadata({params: {id}}:ProductPageProps):   Promises<Metadata>{
const producta = await getProducta(id);
return{
    title:producta.name + " - Flowmazon",
    description:producta.description,
    openGraph: {
         images:[{url: producta.imageUrl,}]
    },
    
    price:producta.price,
}
}

export default async function ProductPage({params: {id}}:ProductPageProps) {
     const producta = await getProducta(id)
    return(
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <Image
            src={producta.imageUrl}
            alt={producta.name}
            width={500}
            height={200}
            className="rounded-lg "
            priority
            />
           <div>
             <h1 className="text-5xl font-bold">{producta.name}</h1>
            <PriceTag price={producta.price} className="mt-4"/>
            <p className="py-6">{producta.description}</p>
           </div>
        </div>
    )
}
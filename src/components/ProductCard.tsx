import { Producta } from "@prisma/client"
import Link from "next/link"
import PriceTag from "./PriceTag"
import Image from "next/image"


interface ProductCardProps {
    producta : Producta
}

export default function ProductCard({producta}:ProductCardProps){
    const isnew = Date.now() - new Date(producta.createdAt).getTime() < 1000 * 60 *60 * 24 * 7 ;
        return(
           <Link href={"/productas/" + producta.id}  className="card w-full bg-base-100 hover:shadow-xl transition-shadow">
           <figure>
            <Image 
            src={producta.imageUrl}
            alt={producta.name}
            width={800}
            height={400}
            className="h-48 object-cover "
            />
           </figure>
            <div className="card-body">
                <h2 className="card-title ">{producta.name}</h2>
                 {isnew && <div className="badge badge-secondary">NEW</div>}
                <p className="">{producta.description}</p>
                <PriceTag price={producta.price}/>
            </div>
           </Link>   
    )
}


// import { Producta } from "@prisma/client";
// import Link from "next/link";
// import PriceTag from "./PriceTag";
// import Image from "next/image";

// interface ProductCardProps {
//   Producta: Producta;
// }

// export default function ProductCard({ Producta }: ProductCardProps) {
//   const isNew =
//     Date.now() - new Date(Producta.createdAt).getTime() <
//     1000 * 60 * 60 * 24 * 7;

//   return (
//     <Link
//       href={"/Productas/" + Producta.id}
//       className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
//     >
//       <figure>
//         <Image
//           src={Producta.imageUrl}
//           alt={Producta.name}
//           width={800}
//           height={400}
//           className="h-48 object-cover"
//         />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">{Producta.name}</h2>
//         {isNew && <div className="badge badge-secondary">NEW</div>}
//         <p>{Producta.description}</p>
//         <PriceTag price={Producta.price} />
//       </div>
//     </Link>
//   );
// }

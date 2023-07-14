import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma"
import { error } from "console";
import { redirect } from "next/navigation";

export const metadata = {
   title:"Add Product - FlomaZon"
}


async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.producta.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

export default function AddProductPage(){
    return(
        <div>
            <h1 className="text-lg mb-3 font-bold">Add Product</h1>
            <form action={addProduct}>
                <input type="text" required name="name" placeholder="Name" className="mb-3 w-full input input-bordered"/>
                <textarea required name="description" placeholder="Description" className="textarea textarea-bordered mb-3 w-full"/>
                 <input type="url" required name="imageUrl" placeholder="Image Url" className="mb-3 w-full input input-bordered"/>
                  <input type="number" required name="price" placeholder="Price" className="mb-3 w-full input input-bordered"/>
                  <FormSubmitButton className="btn-block ">Add Product</FormSubmitButton>
            </form>
        </div>
    )
}
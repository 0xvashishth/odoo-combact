import { FurnitureCard } from "@/components/furniture-card";
import Link from "next/link";

export default function Catalog() {
    return (
        <div className="container my-5">
            <h1 className="font-semibold text-2xl mb-6">Catalog</h1>

            <div className="grid grid-cols-4 gap-4">
                <Link href="/catalog/1">
                    <FurnitureCard
                        title={'Blanca Engineered Wood Single Bed with 6\" Premium Mattress'}
                        imageUrl=""
                        isAvailable={true}
                        rentAmount={510}/>
                </Link>
                
                <FurnitureCard
                    title={'Blanca Engineered Wood Single Bed with 6\" Premium Mattress'}
                    imageUrl=""
                    isAvailable={true}
                    rentAmount={510}/>

                <FurnitureCard
                    title={'Blanca Engineered Wood Single Bed with 6\" Premium Mattress'}
                    imageUrl=""
                    isAvailable={false}
                    rentAmount={510}/>

                <FurnitureCard
                    title={'Blanca Engineered Wood Single Bed with 6\" Premium Mattress'}
                    imageUrl=""
                    isAvailable={false}
                    rentAmount={510}/>
            </div>
        </div>
    )
}
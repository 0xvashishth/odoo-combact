import { FurnitureCard } from "@/components/furniture-card";
import Link from "next/link";

async function getFurnitures() {
    const res = await fetch('http://localhost:8082/api/v1/furniture');

    if (!res.ok) {
        console.error(res.status);
        throw new Error('Error fetching furnitures.');
    }

    const json = res.json();
    return json.furniture ?? [];
}

export default async function Catalog() {
    const furnitures = await getFurnitures();

    const dummyFurnitures = [];

    for (let i = 0; i < 5; i++) {
        dummyFurnitures.push({
            id: i + 1,
            name: 'Blanca Engineered Wood Single Bed with 6" Premium Mattress',
            imageUrls: ['https://assets.furlenco.com/image/upload/dpr_1.0,f_auto,q_auto/v1/plutus/products/6031/hero/1709238202.jpg'],
            availability: true,
            rentalPrice: 650
        });
    }

    return (
        <div className="container my-5">
            <h1 className="font-semibold text-2xl mb-6">Catalog</h1>

            <div className="grid grid-cols-4 gap-4">
                {dummyFurnitures.map(furniture =>
                    <Link href={`/catalog/${furniture.id}`} key={furniture.id}>
                        <FurnitureCard
                            title={furniture.name}
                            imageUrl={furniture.imageUrls[0]}
                            isAvailable={furniture.availability}
                            rentAmount={furniture.rentalPrice} />
                    </Link>
                )}

            </div>
        </div>
    )
}
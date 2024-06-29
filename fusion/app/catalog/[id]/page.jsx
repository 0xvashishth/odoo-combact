import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/datepicker-with-range";

async function getFurnitureById(id) {
    const res = await fetch('http://localhost:8082/api/v1/furniture/' + id);

    if (!res.ok) {
        throw new Error('Error fetching furniture!');
    }

    const json = res.json();
    return json.furniture;
}

export default async function FurnitureDetails({ params }) {
    // const furniture = await getFurnitureById(params.id);
    
    const dummyFurniture = {
        id: params.id,
        name: 'Blanca Engineered Wood Single Bed with 6" Premium Mattress',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae animi ut quis velit facere culpa aut vitae, ipsum adipisci porro debitis, deleniti eaque repellendus soluta iste enim itaque. Accusamus, esse.',
        imageUrls: ['https://assets.furlenco.com/image/upload/dpr_1.0,f_auto,q_auto/v1/plutus/products/6031/hero/1709238202.jpg'],
        availability: true,
        rentalPrice: 650
    };

    return (
        <div className="container my-5 grid grid-cols-2 gap-10">
            <div className="h-60 bg-slate-400">
            <img className="h-auto w-full object-cover" src={dummyFurniture.imageUrls[0]} alt="Sample title" />
            </div>
            <div>
                <h1 className="font-bold text-2xl mb-4">{dummyFurniture.name}</h1>
                <p className="text-lg mb-5">{dummyFurniture.description}</p>

                <div className="font-semibold text-2xl mb-5">₹{dummyFurniture.rentalPrice}/mo</div>

                <div className="mb-6 flex gap-2 items-center">
                    <span className="font-semibold text-lg">Pick your rental date</span>
                    <DatePickerWithRange />
                </div>

                <Button
                    disabled={!dummyFurniture.availability}
                    className="w-full h-14 text-base">
                    {dummyFurniture.availability ? 'Book' : 'Not Available'}
                </Button>
            </div>
        </div>
    )    
}
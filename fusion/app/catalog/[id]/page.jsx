import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/datepicker-with-range";

export default function FurnitureDetails() {
    const isAvailable = true;

    return (
        <div className="container my-5 grid grid-cols-2 gap-10">
            <div className="h-60 bg-slate-400">
                Image will come here
            </div>
            <div>
                <h1 className="font-bold text-2xl mb-4">Blanca Engineered Wood Single Bed with 6" Premium Mattress</h1>
                <p className="text-lg mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae animi ut quis velit facere culpa aut vitae, ipsum adipisci porro debitis, deleniti eaque repellendus soluta iste enim itaque. Accusamus, esse.</p>

                <div className="font-semibold text-2xl mb-5">₹510/mo</div>

                <div className="mb-6 flex gap-2 items-center">
                    <span className="font-semibold text-lg">Pick your rental date</span>
                    <DatePickerWithRange />
                </div>

                <Button
                    disabled={!isAvailable}
                    className="w-full h-14 text-base">
                    {isAvailable ? 'Book' : 'Not Available'}
                </Button>
            </div>
        </div>
    )    
}
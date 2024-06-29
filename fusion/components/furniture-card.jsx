import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

export function FurnitureCard({
    title,
    rentAmount,
    imageUrl,
    isAvailable
}) {
    return (
        <Card>
            <CardHeader>
                <div className="h-44 bg-slate-300 mb-2">
                    <img className="h-full w-full object-cover" src={imageUrl} alt={title} />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="text-base text-slate-700">₹{rentAmount}/mo</CardDescription>
            </CardHeader>
            <CardFooter>
                <div>{isAvailable ? 'Available' : 'Not Available'}</div>
            </CardFooter>
        </Card>

    )
}
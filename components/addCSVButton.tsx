'use client'
import { Button } from "@/components/ui/button";
import { addLocation } from "@/lib/mongo";
import { useEffect } from "react";

type AddCSVButtonProps = {
    name: string,
}

export default function AddCSVButton({name}: AddCSVButtonProps) {
    useEffect(() => {

        addLocation("MSU", "case");
    }, []);

    return (
        <div className="bg-[lightgrey] items-center rounded-lg p-5 flex flex-row gap-10 align-vertical h-min">
            <p className="font-semibold">{name}</p>
            
            <Button>Import CSV</Button>
        </div>
    );
}
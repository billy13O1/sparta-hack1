'use client'
import { Button } from "@/components/ui/button";
import { addLocation } from "@/lib/mongo";
import { useEffect, useState } from "react";

type AddCSVButtonProps = {
    title: string,
}

export default function AddCSVButton({title}: AddCSVButtonProps) {
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    return (
        <div className="bg-[lightgrey] items-center rounded-lg p-5 flex gap-10 align-vertical h-min">
            <p className="font-semibold">{title}</p>
            <div>
                <p>Name</p>
                <input type='text' value={name} onChange={setName} placeholder="Name" />
            </div>
            <div>
                <p>Name</p>
                <input type='text' value={amount} onChange={setAmount} placeholder="Name" />
            </div>
            <div>
                <p>Name</p>
                {/* <input type='text' value={name} onChange={setName} placeholder="Name" /> */}
            </div>
            <div>
                <p>Name</p>
                {/* <input type='text' value={name} onChange={setName} placeholder="Name" /> */}
            </div>
            
            <Button onClick={() => {
                addLocation("MSU", "case");
            }}>Add</Button>
        </div>
    );
}
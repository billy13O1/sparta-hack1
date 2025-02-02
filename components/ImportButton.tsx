'use client'
import { saveCSV } from "@/lib/mongo";
import { Button } from "./ui/button";
import { useRef } from "react";

export default function ImportButton({updateData}) {
    const inputRef = useRef<null | HTMLInputElement>(null);

    const processCSV = (csvData: string) => {
        return csvData.split('\n').slice(1).map((row) => {
            if (row === "") {
                return null;
            }
            return row.split(',').map((item) => item.replace("\r", ""));
        }).filter((value) => value !== null);
    };
    
    // @ts-expect-error aaaa
    const handleFileChange = (event) => { 
        const csvFiles: {[key: string]: string[][]} = {};
        let processed = 0;
        for (const file of event.target.files) {
            if (!file) {
                processed += 1;
                continue;
            }
            const reader = new FileReader();
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                if (e.target === null) {
                    return;
                }
                const csv = processCSV(e.target.result as string);
                csvFiles[file.name.split(".")[0]] = csv;
                processed += 1;
                if (processed === event.target.files.length) {
                    console.log(csvFiles);
                    await saveCSV("MSU", "case", csvFiles);
                    updateData();
                    if (inputRef.current !== null) {
                        inputRef.current.value = "";
                    }
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="">
            <input ref={inputRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleFileChange} multiple/>
            <Button className="w-40" onClick={() => {
                if (inputRef.current !== null) {
                    inputRef.current.click();
                }
            }}>Import Data</Button>
        </div>
    );
}
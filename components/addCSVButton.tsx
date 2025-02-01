'use client'
import { Button } from "@/components/ui/button";
import { getMetrics, saveCSV } from "@/lib/mongo";

type AddCSVButtonProps = {
    title: string,
}

export default function AddCSVButton({title}: AddCSVButtonProps) {
    const processCSV = (csvData: string) => {
        return csvData.split('\n').slice(1).map((row) => {
            if (row === "") {
                return null;
            }
            return row.split(',').map((item) => item.replace("\r", ""));
        }).filter((value) => value !== null);
    };
    
    const handleFileChange = (event) => {
        const csvFiles: {[key: string]: string[][]} = {};
        let processed = 0;
        for (const file of event.target.files) {
            if (!file) {
                processed += 1;
                continue;
            }
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target === null) {
                    return;
                }
                const csv = processCSV(e.target.result as string);
                csvFiles[file.name.split(".")[0]] = csv;
                processed += 1;
                if (processed === event.target.files.length) {
                    console.log(csvFiles);
                    saveCSV("MSU", "case", csvFiles);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="bg-[lightgrey] items-center rounded-lg p-5 flex gap-10 align-vertical h-min">
            <p className="font-semibold">{title}</p>
            <input type="file" accept=".csv" onChange={handleFileChange} multiple/>
            
            <Button onClick={() => {
                getMetrics("MSU", "case");
            }}>Add</Button>
        </div>
    );
}
import AddCSVButton from "@/components/addCSVButton";

export default function Home() {
  return (
    <div className="flex min-h-screen p-8 pb-20 gap-16">
        <AddCSVButton name="In / Out" />    
        <AddCSVButton name="Flow" />    
    </div>
  );
}

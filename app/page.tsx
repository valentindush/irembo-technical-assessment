import { RicaForm } from "@/components/RicaForm";

export default function Home() {
  return (
    <div className="p-8">
      <div className="text-center">
        <h2 className="text-2xl text-blue-500 font-bold">Irembo Gov</h2>
        <h3 className="text-xl font-semibold mt-4">RICA - Import Permit Application Form</h3>
      </div>
      <div className="shadow-sm w-full flex items-center justify-center pt-8">
        <RicaForm/>
      </div>
    </div>
  );
}

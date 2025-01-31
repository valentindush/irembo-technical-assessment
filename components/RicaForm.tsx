import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  // Business Owner Details
  citizenship: z.enum(['Rwandan', 'Foreigner']),
  identificationDocumentNumber: z.string().optional(),
  passportNumber: z.string().optional(),
  otherNames: z.string().min(1),
  surname: z.string().min(1),
  nationality: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  district: z.string().min(1),

  // Business Details
  businessType: z.enum(['Retailer', 'Wholesale', 'Manufacturer']),
  companyName: z.string().min(1),
  tin: z.string().regex(/^\d{9}$/),
  registrationDate: z.string().min(1),
  businessDistrict: z.string().min(1),

  // Product Information
  importPurpose: z.enum(['Direct sale', 'Personal use', 'Trial use', 'Other']),
  productCategory: z.string().min(1),
  productName: z.string().min(1),
  weight: z.number().min(0.01),
  description: z.string().min(1),
  unit: z.enum(['Kgs', 'Tonnes']),
  quantity: z.number().min(1),
}).superRefine((data, ctx) => {
  if (data.citizenship === 'Rwandan' && data.identificationDocumentNumber && !/^\d{16}$/.test(data.identificationDocumentNumber)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'ID must be 16 digits',
      path: ['identificationDocumentNumber']
    });
  }
  if (data.citizenship === 'Foreigner' && !data.passportNumber) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passport required',
      path: ['passportNumber']
    });
  }
});

export default function RicaForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(schema)
  });

  const citizenship = watch('citizenship');

  const onSubmit = (data: any) => {
    console.log(data);
    // Add email submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Business Owner Section */}
      <section className="space-y-4 p-4 border rounded">
        <h2 className="text-lg font-bold">Business Owner Details</h2>
        
        <div>
          <label>Citizenship *</label>
          <select {...register('citizenship')} className="w-full p-2 border rounded">
            <option value="">Select</option>
            <option value="Rwandan">Rwandan</option>
            <option value="Foreigner">Foreigner</option>
          </select>
          {errors.citizenship && <span className="text-red-500 text-sm">{String(errors.citizenship.message)}</span>}
        </div>

        {citizenship === 'Rwandan' && (
          <div>
            <label>ID Number *</label>
            <input {...register('identificationDocumentNumber')} 
                   className="w-full p-2 border rounded"
                   placeholder="16-digit ID" />
            {errors.identificationDocumentNumber && <span className="text-red-500 text-sm">{String(errors.identificationDocumentNumber.message)}</span>}
          </div>
        )}

        {citizenship === 'Foreigner' && (
          <div>
            <label>Passport Number *</label>
            <input {...register('passportNumber')} 
                   className="w-full p-2 border rounded"
                   placeholder="Passport number" />
            {errors.passportNumber && <span className="text-red-500 text-sm">{String(errors.passportNumber.message)}</span>}
          </div>
        )}

        {/* Other fields similarly implemented */}
      </section>

      {/* Other sections (Business Details, Product Info) follow similar patterns */}

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Submit Application
      </button>
    </form>
  );
}
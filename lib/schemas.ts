import { z } from "zod";

export const formSchema = z.object({
    // Business Owner Details
    citizenship: z.enum(["Rwandan", "Foreigner"], {
        required_error: "This field is required",
    }),
    identificationDocumentNumber: z.string().regex(/^\d{16}$/,"ID number must be 16 digits").optional(),
    passportNumber: z.string().optional(),
    otherNames: z.string({ required_error: "This field is required" }).min(1, "This field is required"),
    surname: z.string({ required_error: "This field is required" }).min(1, "This field is required"),
    nationality: z.string({ required_error: "This field is required" }).min(1, "This field is required"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits").optional(),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    ownerDistrict: z.string().min(1, "This field is required"),

    // Business Details
    businessType: z.enum(["Retailer", "Wholesale", "Manufacturer"], {
        required_error: "This field is required",
    }),
    companyName: z.string({ required_error: "This field is required" }).min(1, "This field is required"),
    tin: z.string({ required_error: "This field is required" }).refine(val => /^\d{9}$/.test(val), "Please provide a valid TIN number"),
    registrationDate: z.date({
        required_error: "This field is required",
    }),
    businessDistrict: z.string().min(1, "This field is required"),

    // Product Information
    importPurpose: z.enum(
        ["Direct sale", "Personal use", "Trial use", "Other"],
        { required_error: "This field is required" }
    ),
    specifyPurpose: z.string().optional(),
    productCategory: z.string({ required_error: "This field is required" }).min(1, "This field is required"),
    productName: z.string({ required_error: "This field is required" }).min(1, "This field is required"),
    weight: z.number().min(0.01, "Weight must be greater than 0").optional(),
    description: z.string({ required_error: "This field is required" }).min(1, "This field is required"),
    unit: z.enum(["Kgs", "Tonnes"], { required_error: "This field is required" }),
    quantity: z.number({ required_error: "This field is required" }).min(1, "Please provide a number greater than zero"),
}).superRefine((data, ctx) => {

    console.log('super refined triggered')

    if (data.citizenship === 'Rwandan') {
        if (!data.identificationDocumentNumber) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'This field is required',
                path: ['identificationDocumentNumber']
            });
        } else if (!/^\d{16}$/.test(data.identificationDocumentNumber)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'ID number must be 16 digits',
                path: ['identificationDocumentNumber']
            });
        }
    }

    if (data.citizenship === 'Foreigner') {
        if (!data.passportNumber) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'This field is required',
                path: ['passportNumber']
            });
        } else if (!/^[A-Za-z0-9]{6,}$/.test(data.passportNumber)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Invalid passport number format',
                path: ['passportNumber']
            });
        }
    }

    if (data.importPurpose === "Other" && !data.specifyPurpose) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "This field is required",
            path: ['specifyPurpose']
        });
    }
});
export type FormValues = z.infer<typeof formSchema>;
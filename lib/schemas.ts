import { z } from "zod";

export const formSchema = z.object({
  // Business Owner Details
  citizenship: z.enum(["Rwandan", "Foreigner"], {
    required_error: "This field is required",
  }),
  identificationDocumentNumber: z.string().optional(),
  passportNumber: z.string().optional(),
  otherNames: z.string({required_error: "This field is required"}).min(1, "This field is required"),
  surname: z.string({required_error: "This field is required"}).min(1, "This field is required"),
  nationality: z.string({required_error: "This field is required"}).min(1, "This field is required"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  ownerDistrict: z.string().min(1, "This field is required"),

  // Business Details
  businessType: z.enum(["Retailer", "Wholesale", "Manufacturer"], {
    required_error: "This field is required",
  }),
  companyName: z.string({required_error: "This field is required"}).min(1, "This field is required"),
  tin: z.string({required_error: "This field is required"}).refine(val => /^\d{9}$/.test(val), "Please provide a valid TIN number"),
  registrationDate: z.date({
    required_error: "This field is required",
  }),
  businessDistrict: z.string().min(1, "This field is required"),

  // Product Information
  importPurpose: z.enum(
    ["Direct sale", "Personal use", "Trial use", "Other"], 
    { required_error: "This field is required" }
  ),
  specifyPurpose: z.string({required_error: "This field is required"}),
  productCategory: z.string({required_error: "This field is required"}).min(1, "This field is required"),
  productName: z.string({required_error: "This field is required"}).min(1, "This field is required"),
  weight: z.number().min(0.01, "Weight must be greater than 0").optional(),
  description: z.string({required_error: "This field is required"}).min(1, "This field is required"),
  unit: z.enum(["Kgs", "Tonnes"], { required_error: "This field is required" }),
  quantity: z.number({required_error: "This field is required"}).min(1, "Please provide a number greater than zero"),
}).superRefine((data, ctx) => {
  if (data.citizenship === "Rwandan" && !/^\d{16}$/.test(data.identificationDocumentNumber || "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "ID must be 16 digits",
      path: ["identificationDocumentNumber"]
    });
  }
  if (data.citizenship === "Foreigner" && !data.passportNumber) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "This field is required",
      path: ["passportNumber"]
    });
  }
});

export type FormValues = z.infer<typeof formSchema>;
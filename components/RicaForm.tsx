"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { formSchema } from "@/lib/schemas"
import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { toast } from "@/hooks/use-toast"

export function RicaForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touchedFields, setTouchedFields] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: false,
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      citizenship: undefined,
      identificationDocumentNumber: "",
      passportNumber: "",
      otherNames: "",
      surname: "",
      nationality: "",
      phone: "",
      email: "",
      ownerDistrict: "",
      businessType: undefined,
      companyName: "",
      tin: "",
      registrationDate: undefined,
      businessDistrict: "",
      importPurpose: undefined,
      productCategory: "",
      productName: "",
      weight: 0,
      description: "",
      unit: undefined,
      quantity: 0,
    },
  })

  const citizenship = form.watch("citizenship")
  const importPurpose = form.watch("importPurpose")

  const steps = [
    {
      id: 1,
      name: "Business Owner",
      fields: [
        "citizenship",
        "identificationDocumentNumber",
        "passportNumber",
        "otherNames",
        "surname",
        "nationality",
        "phone",
        "email",
        "ownerDistrict",
      ],
    },
    {
      id: 2,
      name: "Business Details",
      fields: ["businessType", "companyName", "tin", "registrationDate", "businessDistrict"],
    },
    {
      id: 3,
      name: "Product Info",
      fields: ["importPurpose", "productCategory", "productName", "weight", "description", "unit", "quantity"],
    },
  ]

  async function handleNext() {
    const fields = steps[currentStep - 1].fields

    if (citizenship === "Rwandan") {
      fields.push("identificationDocumentNumber")
    } else if (citizenship === "Foreigner") {
      fields.push("passportNumber")
    }

    if (importPurpose === "Other") {
      fields.push("specifyPurpose")
    }

    fields.forEach((field) => {
      if (!touchedFields.includes(field)) {
        form.trigger(field as any)
      }
    })
    setTouchedFields((prev) => [...prev, ...fields])

    const isValid = await form.trigger(fields as any)
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    }
  }
  function handlePrev() {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  useEffect(() => {
    if (citizenship === "Rwandan") {
      form.trigger("identificationDocumentNumber")
      form.resetField("passportNumber")
    } else if (citizenship === "Foreigner") {
      form.trigger("passportNumber")
      form.resetField("identificationDocumentNumber")
    }
  }, [citizenship, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("SUBMITTING....")
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/rica/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit application")
      }

      toast({
        title: "Application Submitted Successfully!",
        description: (
          <div className="mt-2">
            <p>Your reference number: {data.reference}</p>
            <p>A confirmation email has been sent to your inbox.</p>
          </div>
        ),
      })

      form.reset()
      setCurrentStep(1)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl  w-full mx-auto p-4">
        {/* Progress Indicator */}
        <div className="flex justify-between mb-8">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <Badge variant={currentStep >= step.id ? "default" : "outline"} className="mb-2 text-xl">
                {step.id}
              </Badge>
              <span className={cn("text-sm", currentStep >= step.id ? "font-medium" : "text-muted-foreground")}>
                {step.name}
              </span>
            </div>
          ))}
        </div>

        {/* Business Owner Section */}
        {currentStep == 1 && (
          <div className="space-y-4 p-6 border rounded-lg">
            <h2 className="text-lg font-semibold">Business Owner Details</h2>

            <FormField
              control={form.control}
              name="citizenship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Citizenship *</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select citizenship" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Rwandan">Rwandan</SelectItem>
                      <SelectItem value="Foreigner">Foreigner</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {citizenship === "Rwandan" && (
              <FormField
                control={form.control}
                name="identificationDocumentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identification Document Number *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter identification document number"
                        value={field.value || ""}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          form.trigger("identificationDocumentNumber")
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {citizenship === "Foreigner" && (
              <FormField
                control={form.control}
                name="passportNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passport Number *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder=""
                        value={field.value || ""}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          form.trigger("passportNumber")
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="otherNames"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Names *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter other names" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter surname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality *</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                      field.onBlur()
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Rwanda">Rwanda</SelectItem>
                      <SelectItem value="Kenya">Kenya</SelectItem>
                      <SelectItem value="Uganda">Uganda</SelectItem>
                      <SelectItem value="Tanzania">Tanzania</SelectItem>
                      {/* Countrie */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ownerDistrict"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location *</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                      field.onBlur()
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Kigali">Kigali</SelectItem>
                      <SelectItem value="Northern">Northern</SelectItem>
                      <SelectItem value="Southern">Southern</SelectItem>
                      <SelectItem value="Eastern">Eastern</SelectItem>
                      <SelectItem value="Western">Western</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Business Details Section */}
        {currentStep == 2 && (
          <div className="space-y-4 p-6 border rounded-lg">
            <h2 className="text-lg font-semibold">Business Details</h2>

            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Type *</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                      field.onBlur()
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Retailer">Retailer</SelectItem>
                      <SelectItem value="Wholesale">Wholesale</SelectItem>
                      <SelectItem value="Manufacturer">Manufacturer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TIN Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter TIN number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="registrationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Registration Date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="businessDistrict"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location *</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                      field.onBlur()
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Kigali">Kigali</SelectItem>
                      <SelectItem value="Northern">Northern</SelectItem>
                      <SelectItem value="Southern">Southern</SelectItem>
                      <SelectItem value="Eastern">Eastern</SelectItem>
                      <SelectItem value="Western">Western</SelectItem>
                      {/* could actually fetch from an api... */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Product Information Section */}
        {currentStep == 3 && (
          <div className="space-y-4 p-6 border rounded-lg">
            <h2 className="text-lg font-semibold">Product Information</h2>

            <FormField
              control={form.control}
              name="importPurpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose of Importation *</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                      field.onBlur()
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Direct sale">Direct sale</SelectItem>
                      <SelectItem value="Personal use">Personal use</SelectItem>
                      <SelectItem value="Trial use">Trial use</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {importPurpose === "Other" && (
              <FormField
                control={form.control}
                name="specifyPurpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specify purpose of importation*</FormLabel>
                    <FormControl>
                      <Input placeholder="Specify purpose" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="productCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category *</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        field.onBlur()
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="General purpose">General purpose</SelectItem>
                        <SelectItem value="Construction materials">Construction materials</SelectItem>
                        <SelectItem value="Chemicals">Chemicals</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name *</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        field.onBlur()
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product name" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="General purpose">General purpose</SelectItem>
                        <SelectItem value="Construction materials">Construction materials</SelectItem>
                        <SelectItem value="Chemicals">Chemicals</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Enter weight"
                        {...field}
                        // Handle empty string case properly
                        value={field.value || ""}
                        onChange={(e) => {
                          const value = e.target.value
                          field.onChange(value === "" ? 0 : Number.parseFloat(value))
                        }}
                        onBlur={() => {
                          field.onBlur()
                          setTouchedFields((prev) => [...prev, "weight"])
                        }}
                      />
                    </FormControl>
                    {touchedFields.includes("weight") && <FormMessage />}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit *</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        field.onBlur()
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Kgs">Kilograms</SelectItem>
                        <SelectItem value="Tonnes">Tonnes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter quantity"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value
                          field.onChange(value === "" ? 0 : Number.parseFloat(value))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the products" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Navigation Controls */}
        <div className="mt-4 flex justify-between">
          <Button type="button" variant="outline" onClick={handlePrev} disabled={currentStep === 1}>
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
import { type NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { format } from "date-fns";
import { formSchema, type FormValues } from "@/lib/schemas";
import { RicaTemplate } from "../util/templates/rica";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data: FormValues = body; // TODO: Server-side validations

    const reference = `RICA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const emailHtml = getEmailHtml(data, reference);

    const msg = {
      to: [...(data.email ? [data.email] : []), "p.touko@irembo.com"],
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: `RICA Import Permit Application - ${data.companyName}`,
      html: emailHtml,
    };

    // Send the email
    await sgMail.sendMultiple(msg);

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted and email sent successfully",
        reference,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process application",
      },
      { status: 500 }
    );
  }
}

function getEmailHtml(data: FormValues, reference: string): string {
  let template = RicaTemplate;
  const replacements: Record<string, string> = {
    "#REF-[TIMESTAMP]": reference,
    "[SUBMISSION_DATE]": format(new Date(), "PPP"),
    "[CITIZENSHIP]": data.citizenship || "Not provided",
    "[ID_NUMBER]": data.citizenship === "Rwandan" ? data.identificationDocumentNumber || "Not provided" : data.passportNumber || "Not provided",
    "[OTHER_NAMES]": data.otherNames || "Not provided",
    "[SURNAME]": data.surname || "Not provided",
    "[NATIONALITY]": data.nationality || "Not provided",
    "[PHONE]": data.phone || "Not provided",
    "[EMAIL]": data.email || "Not provided",
    "[BUSINESS_OWNER_ADDRESS]": data.ownerDistrict || "Not provided",
    "[BUSINESS_TYPE]": data.businessType || "Not provided",
    "[COMPANY_NAME]": data.companyName || "Not provided",
    "[TIN_NUMBER]": data.tin || "Not provided",
    "[REGISTRATION_DATE]": data.registrationDate ? format(new Date(data.registrationDate), "PPP") : "Not provided",
    "[BUSINESS_ADDRESS]": data.businessDistrict || "Not provided",
    "[IMPORTATION_PURPOSE]": data.importPurpose === "Other" ? `${data.importPurpose} - ${data.specifyPurpose || "Not specified"}` : data.importPurpose || "Not provided",
    "[PRODUCT_CATEGORY]": data.productCategory || "Not provided",
    "[PRODUCT_NAME]": data.productName || "Not provided",
    "[WEIGHT]": data.weight ? data.weight.toString() : "Not provided",
    "[QUANTITY]": data.quantity ? data.quantity.toString() : "Not provided",
    "[UNIT_OF_MEASUREMENT]": data.unit || "Not provided",
    "[PRODUCT_DESCRIPTION]": data.description || "Not provided",
  };

  Object.entries(replacements).forEach(([placeholder, value]) => {
    template = template.replace(new RegExp(placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "g"), value);
  });

  console.log("Final Email HTML:", template);

  return template;
}

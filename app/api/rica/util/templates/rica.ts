export const RicaTemplate = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>RICA Import Permit Application</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f5f5f5;">
    <div style="max-width: 800px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background-color: #0066cc; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">RICA Import Permit Application</h1>
            <p style="margin: 10px 0 0;">Application Reference: #REF-[TIMESTAMP]</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 20px;">
            <!-- Application Status -->
            <div style="background-color: #e6f3ff; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                <p style="margin: 0; color: #0066cc;">
                    <strong>Application Status:</strong> Submitted
                    <br>
                    <strong>Submission Date:</strong> [SUBMISSION_DATE]
                </p>
            </div>

            <!-- Business Owner Details -->
            <div style="margin-bottom: 30px;">
                <h2 style="color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 5px;">Business Owner Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Citizenship:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">[CITIZENSHIP]</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>ID/Passport Number:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">[ID_NUMBER]</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Full Name:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">[OTHER_NAMES] [SURNAME]</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Nationality:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">[NATIONALITY]</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Contact:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">
                            Phone: [PHONE]<br>
                            Email: [EMAIL]
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Address:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">[BUSINESS_OWNER_ADDRESS]</td>
                    </tr>
                </table>
            </div>

            <!-- Business Details -->
            <div style="margin-bottom: 30px;">
                <h2 style="color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 5px;">Business Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Business Type:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">[BUSINESS_TYPE]</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Company Name:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">[COMPANY_NAME]</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>TIN Number:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">[TIN_NUMBER]</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Registration Date:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">[REGISTRATION_DATE]</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Business Address:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">[BUSINESS_ADDRESS]</td>
                    </tr>
                </table>
            </div>

            <!-- Product Information -->
            <div style="margin-bottom: 30px;">
                <h2 style="color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 5px;">Product Information</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Purpose of Importation:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">[IMPORTATION_PURPOSE]</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Product Category:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">[PRODUCT_CATEGORY]</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Product Name:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">[PRODUCT_NAME]</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Weight:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">[WEIGHT] kg</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Quantity:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">[QUANTITY] [UNIT_OF_MEASUREMENT]</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Description:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">[PRODUCT_DESCRIPTION]</td>
                    </tr>
                </table>
            </div>

            <!-- Footer Note -->
            <div style="background-color: #e6f3ff; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <p style="margin: 0; color: #0066cc; font-size: 14px;">
                    This is an automated email confirmation of your RICA Import Permit application submission. Please retain this email for your records.
                    <br><br>
                    For any queries, please contact Irembo support.
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #0066cc; color: white; padding: 20px; text-align: center; font-size: 14px;">
            <p style="margin: 0;">© 2025 Irembo. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`
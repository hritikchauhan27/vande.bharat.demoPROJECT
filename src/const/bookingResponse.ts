import pdfkit from 'pdfkit';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export async function generatePDF(data:any) {
    const outputPath = path.join(__dirname, 'pdfs'); 
    const outputFilename = `invoice-${data.bookingDate}.pdf`;
    const outputFilePath = path.join(outputPath, outputFilename);

    // Create the output directory if it doesn't exist
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }

    const doc = new pdfkit({ autoFirstPage: true });
    doc.pipe(fs.createWriteStream(outputFilePath));

    // Set font size and style
    doc.fontSize(16);
    doc.font('Helvetica-Bold');

    // Add title
    doc.text('Booking Receipt', { align: 'center' });
    doc.moveDown(0.5); // Add some space

    // Set font size and style for the content
    doc.fontSize(12);
    doc.font('Helvetica');

    // Add personalized message
    doc.text(`Hello,`);
    doc.moveDown(0.5); // Add some space
    doc.text('Thank you for booking a ticket. Have a safe journey.');

    // Add booking details
    const seatNumbers = data.seats.map((seat) => seat.seatNumber);
    doc.moveDown();
    doc.text(`User ID: ${data.userId}`);
    doc.text(`Booking Date: ${data.bookingDate}`);
    doc.text(`Train Id: ${data.trainId}`);
    doc.text(`Coach Id: ${data.coachId}`);
    doc.text(`Seat Number:${seatNumbers}`)
    doc.end();

    console.log('PDF invoice generated and saved:', outputFilePath);
    return [outputFilePath, outputFilename];
}


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
})

export async function sendRecipient(filepath,Email) {
    try {

        const info = await transporter.sendMail({
            to: Email,
            subject: "Your booking has been accepted",
            text: `Dear User, Your booking has been approved. Kindly refer to the attached pdf for complete details.`,
            attachments: [
                {
                    filename: "booking_details.pdf",
                    path: filepath,
                },
            ],
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}
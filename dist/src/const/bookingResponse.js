"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRecipient = exports.generatePDF = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
function generatePDF(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const outputPath = path_1.default.join(__dirname, 'pdfs'); // Change to your desired folder path
        const outputFilename = `invoice-${data.bookingDate}.pdf`;
        const outputFilePath = path_1.default.join(outputPath, outputFilename);
        // Create the output directory if it doesn't exist
        if (!fs_1.default.existsSync(outputPath)) {
            fs_1.default.mkdirSync(outputPath);
        }
        const doc = new pdfkit_1.default({ autoFirstPage: true });
        doc.pipe(fs_1.default.createWriteStream(outputFilePath));
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
        doc.text(`Hello, { align: 'center' }`);
        doc.moveDown(0.5); // Add some space
        doc.text('Thank you for booking a ticket. Have a safe journey.');
        // Add booking details
        doc.moveDown(); // Add some space
        doc.text(`User ID: ${data.userId}`);
        doc.text(`Booking Date: ${data.bookingDate}`);
        doc.text(`Train Id: ${data.trainId}`);
        doc.text(`Coach Id: ${data.coachId}`);
        doc.text(`Seat Number:${"data.seats.seatNumber"}`);
        doc.end();
        console.log('PDF invoice generated and saved:', outputFilePath);
        return [outputFilePath, outputFilename];
    });
}
exports.generatePDF = generatePDF;
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});
function sendRecipient(filepath, Email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = yield transporter.sendMail({
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
        }
        catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    });
}
exports.sendRecipient = sendRecipient;
//# sourceMappingURL=bookingResponse.js.map
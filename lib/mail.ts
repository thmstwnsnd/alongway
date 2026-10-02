// Email sending. Until the email service is connected, messages are printed
// to the terminal running the dev server so flows can be tested.
export async function sendMail(opts: { to: string; subject: string; text: string }) {
  console.log("\n--- EMAIL (not sent; dev only) ---");
  console.log(`To: ${opts.to}\nSubject: ${opts.subject}\n\n${opts.text}`);
  console.log("--- END EMAIL ---\n");
}

import QRCode from "qrcode";

export default async function handler(req, res) {
  const { pa, am, tn } = req.query;

  if (!pa || !am) {
    return res.status(400).send("Missing required parameters");
  }

  const upiUrl = `upi://pay?pa=${pa}&pn=Rakesh&am=${am}&cu=INR&tn=${tn || ''}`;

  try {
    const qr = await QRCode.toDataURL(upiUrl);
    const img = Buffer.from(qr.split(",")[1], "base64");
    res.setHeader("Content-Type", "image/png");
    res.send(img);
  } catch (err) {
    res.status(500).send("Error generating QR code");
  }
}

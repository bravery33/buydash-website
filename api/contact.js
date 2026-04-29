import nodemailer from "nodemailer";

const REQUIRED_FIELDS = ["name", "company", "email", "productType", "message"];

function normalize(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return normalize(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildMessage(fields) {
  const rows = [
    ["Name", fields.name],
    ["Company", fields.company],
    ["Email", fields.email],
    ["Country", fields.country],
    ["Product Type", fields.productType],
    ["Test Platform", fields.testPlatform],
    ["Package Size", fields.packageSize],
    ["Pitch", fields.pitch],
    ["Channel Count", fields.channelCount],
    ["DPS / HV / Analog Requirements", fields.dpsHvAnalogRequirements],
    ["Temperature Range", fields.temperatureRange],
    ["Site Count", fields.siteCount],
    ["Expected Quantity", fields.expectedQuantity],
    ["Target Application", fields.targetApplication],
    ["Message", fields.message],
  ];

  const text = rows
    .map(([label, value]) => `${label}: ${normalize(value) || "-"}`)
    .join("\n");

  const htmlRows = rows
    .map(([label, value]) => (
      `<tr><th align="left" style="padding:8px;border-bottom:1px solid #dde3ec;">${escapeHtml(label)}</th><td style="padding:8px;border-bottom:1px solid #dde3ec;">${escapeHtml(value) || "-"}</td></tr>`
    ))
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111827;">
      <h2>BUYDASH Website Inquiry</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:760px;">
        ${htmlRows}
      </table>
    </div>
  `;

  return { text, html };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  if (normalize(body.website)) {
    return res.status(200).json({ ok: true });
  }

  const fields = {
    name: normalize(body.name),
    company: normalize(body.company),
    email: normalize(body.email),
    country: normalize(body.country),
    productType: normalize(body.productType),
    testPlatform: normalize(body.testPlatform),
    packageSize: normalize(body.packageSize),
    pitch: normalize(body.pitch),
    channelCount: normalize(body.channelCount),
    dpsHvAnalogRequirements: normalize(body.dpsHvAnalogRequirements),
    temperatureRange: normalize(body.temperatureRange),
    siteCount: normalize(body.siteCount),
    expectedQuantity: normalize(body.expectedQuantity),
    targetApplication: normalize(body.targetApplication),
    message: normalize(body.message),
  };

  const missing = REQUIRED_FIELDS.filter((field) => !fields[field]);
  if (missing.length > 0) {
    return res.status(400).json({ ok: false, error: "Missing required fields", missing });
  }

  if (!isEmail(fields.email)) {
    return res.status(400).json({ ok: false, error: "Invalid email address" });
  }

  if (Object.values(fields).some((value) => value.length > 4000)) {
    return res.status(400).json({ ok: false, error: "Field value too long" });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL || user;

  if (!host || !user || !pass || !to) {
    return res.status(500).json({ ok: false, error: "Email service is not configured" });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const { text, html } = buildMessage(fields);

  await transporter.sendMail({
    from: `"BUYDASH Website" <${user}>`,
    to,
    replyTo: fields.email,
    subject: `BUYDASH inquiry: ${fields.company} / ${fields.productType}`,
    text,
    html,
  });

  return res.status(200).json({ ok: true });
}

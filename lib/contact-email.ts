type ContactEmail = {
  name: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  recipient: string;
  policyUrl: string;
  submittedAt: string;
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]!);

export function buildContactEmail(data: ContactEmail) {
  const safe = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, escapeHtml(value)])) as ContactEmail;
  const replyUrl = escapeHtml(`mailto:${encodeURIComponent(data.email)}?subject=Re%3A%20TOD%20enquiry`);
  const text = `New Website Enquiry

Full Name: ${data.name}
Organization: ${data.organization}
Job Title: ${data.role}
Email Address: ${data.email}
Phone Number: ${data.phone}
Area of Interest: ${data.interest}

Client Message:
${data.message}

Privacy Policy Consent: Accepted
Policy URL: ${data.policyUrl}
Submitted: ${data.submittedAt} · Riyadh time
Sent to: ${data.recipient}`;
  const html = `<!doctype html>
<html lang="en" dir="ltr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>New Website Enquiry | TOD</title></head>
<body style="margin:0;background:#eae0d5;font-family:Tahoma,Arial,sans-serif;color:#333333;line-height:1.9">
<div style="max-width:640px;margin:24px auto;padding:0 16px">

<div style="background:#fff;border:1px solid #d9cdbd">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
<tr><td style="background:#333333;padding:30px 28px;border-bottom:3px solid #c99e69;color:#f7f3ec">
<div style="font-family:Arial,sans-serif;font-size:34px;font-weight:bold;letter-spacing:4px;color:#c99e69" dir="ltr">TOD</div>
<div style="font-size:11px;color:#eae0d5" dir="ltr">TOTAL ORGANIZATION DEVELOPMENT</div>
<h1 style="font-size:24px;font-weight:normal;line-height:1.6;margin:25px 0 6px">New Website Enquiry</h1>
<p style="margin:0;color:#eae0d5;font-size:13px">A new message from the TOD website contact form</p>
</td></tr>
<tr><td style="padding:25px 28px 10px">
<p style="margin:0 0 22px;font-size:14px"><strong>${safe.name}</strong> from <strong>${safe.organization}</strong> has submitted an enquiry about <strong>${safe.interest}</strong>.</p>
<h2 style="font-size:16px;margin:0 0 12px;font-weight:bold">Contact Details</h2>
<table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:13px;border:1px solid #d9cdbd">
<tr style="background:#f7f3ec"><th scope="row" style="padding:12px;text-align:left;font-weight:normal;color:#5c5852;width:36%;border-bottom:1px solid #d9cdbd">Full Name</th><td style="padding:12px;border-bottom:1px solid #d9cdbd">${safe.name}</td></tr>
<tr><th scope="row" style="padding:12px;text-align:left;font-weight:normal;color:#5c5852;border-bottom:1px solid #d9cdbd">Organization</th><td style="padding:12px;border-bottom:1px solid #d9cdbd">${safe.organization}</td></tr>
<tr style="background:#f7f3ec"><th scope="row" style="padding:12px;text-align:left;font-weight:normal;color:#5c5852;border-bottom:1px solid #d9cdbd">Job Title</th><td style="padding:12px;border-bottom:1px solid #d9cdbd">${safe.role}</td></tr>
<tr><th scope="row" style="padding:12px;text-align:left;font-weight:normal;color:#5c5852;border-bottom:1px solid #d9cdbd">Email Address</th><td style="padding:12px;border-bottom:1px solid #d9cdbd;overflow-wrap:anywhere"><a style="color:#333333;text-decoration:underline" href="mailto:${safe.email}" dir="ltr">${safe.email}</a></td></tr>
<tr style="background:#f7f3ec"><th scope="row" style="padding:12px;text-align:left;font-weight:normal;color:#5c5852;border-bottom:1px solid #d9cdbd">Phone Number</th><td style="padding:12px;border-bottom:1px solid #d9cdbd"><span dir="ltr">${safe.phone}</span></td></tr>
<tr><th scope="row" style="padding:12px;text-align:left;font-weight:normal;color:#5c5852">Area of Interest</th><td style="padding:12px">${safe.interest}</td></tr>
</table>
<h2 style="font-size:16px;margin:26px 0 12px;font-weight:bold">Client Message</h2>
<div dir="auto" style="background:#f7f3ec;border:1px solid #d9cdbd;padding:18px;font-size:14px;overflow-wrap:anywhere">
${safe.message.replace(/\r?\n/g, "<br>")}
</div>
<table role="presentation" cellspacing="0" cellpadding="0" style="margin:26px 0 12px"><tr><td style="background:#333333;border:1px solid #333333;text-align:center"><a href="${replyUrl}" style="display:inline-block;padding:12px 28px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold">Reply to Client <span style="color:#c99e69">↗</span></a></td></tr></table>
<p style="font-size:11px;color:#5c5852;margin:0 0 22px">Replies will be addressed to the email provided by the client.</p>
</td></tr>
<tr><td style="padding:18px 28px;background:#f7f3ec;border-top:1px solid #d9cdbd;font-size:11px;color:#5c5852">
<div>Privacy Policy Consent: Accepted · <a href="${safe.policyUrl}" style="color:#5c5852">View policy</a></div>
<div>Submitted: ${safe.submittedAt} · Riyadh time</div>
<div style="margin-top:12px;border-top:1px solid #d9cdbd;padding-top:12px">Sent to <span dir="ltr">${safe.recipient}</span> via the TOD website contact form.</div>
</td></tr>
</table></div>
<p style="text-align:center;font-size:11px;color:#5c5852;margin:16px 0 25px" dir="ltr">TOD · Leadership. Organizations. Human Systems.</p>
</div></body></html>
`;
  return { html, text };
}

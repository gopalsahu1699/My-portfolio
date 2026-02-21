import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(20),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = schema.parse(body);

        // 1) Save to Supabase
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "your_supabase_url_here") {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );
            await supabase.from("contact_messages").insert({
                name: data.name,
                email: data.email,
                message: data.message,
            });
        }

        // 2) Send email with Resend
        if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "your_resend_api_key_here") {
            const resend = new Resend(process.env.RESEND_API_KEY);
            await resend.emails.send({
                from: "Portfolio Contact <onboarding@resend.dev>",
                to: process.env.CONTACT_EMAIL || "gopalsahu1699@gmail.com",
                subject: `New Portfolio Message from ${data.name}`,
                html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0B0B0F;color:#f8f8ff;padding:32px;border-radius:12px;border:1px solid rgba(255,255,255,0.1)">
            <h2 style="margin:0 0 24px;background:linear-gradient(135deg,#8B5CF6,#06B6D4);-webkit-background-clip:text;-webkit-text-fill-color:transparent">
              New Message from Portfolio 📨
            </h2>
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:10px 0;color:rgba(248,248,255,0.5);font-size:13px;width:80px">From</td>
                <td style="padding:10px 0;font-weight:600">${data.name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:rgba(248,248,255,0.5);font-size:13px">Email</td>
                <td style="padding:10px 0"><a href="mailto:${data.email}" style="color:#8B5CF6">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:rgba(248,248,255,0.5);font-size:13px;vertical-align:top">Message</td>
                <td style="padding:10px 0;line-height:1.7">${data.message.replace(/\n/g, "<br/>")}</td>
              </tr>
            </table>
            <div style="margin-top:32px;padding:16px;background:rgba(139,92,246,0.1);border-radius:8px;font-size:12px;color:rgba(248,248,255,0.4)">
              Sent via your portfolio contact form • ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
            </div>
          </div>
        `,
            });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("[Contact API]", err);
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }
}

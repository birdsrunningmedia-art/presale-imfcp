import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

type SendPresaleEmailInput = {
  email: string;
  reference: string;
};

export async function sendPresaleConfirmationEmail({
  email,
  reference,
}: SendPresaleEmailInput) {
  const claimUrl = ``;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: "Your Presale Access Is Secured 🎉",
    html: `
      <div style="font-family: system-ui, sans-serif; line-height: 1.6">
        <h2>Presale confirmed</h2>

        <p>
          Thanks for purchasing <strong>Early Pro Access</strong>.
          Your spot is secured.
        </p>

        <p>
          When we launch, you’ll be able to claim your Pro access using this email.
        </p>

        <p>
          <strong>Reference:</strong> ${reference}
        </p>

        <p>
          <a
            href="${claimUrl}"
            style="
              display: inline-block;
              margin-top: 16px;
              padding: 12px 20px;
              background: #000;
              color: #fff;
              text-decoration: none;
              border-radius: 6px;
            "
          >
            View Presale Status
          </a>
        </p>

        <p style="margin-top: 32px; font-size: 12px; color: #666">
          Keep this email — it’s your proof of purchase.
        </p>
      </div>
    `,
  });
}
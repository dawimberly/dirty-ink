import type { ShopPriority, ShopStatus } from "@/lib/types/shop";

export const STATUS_COLORS: Record<ShopStatus, string> = {
  "Not Contacted": "bg-zinc-500/15 text-zinc-300 border-zinc-500/30",
  Contacted: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  "Follow-up": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Interested: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Booked: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  Rejected: "bg-rose-500/15 text-rose-300 border-rose-500/30",
};

export const PRIORITY_COLORS: Record<ShopPriority, string> = {
  High: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  Medium: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Low: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
};

export type MessageTemplate = {
  id: string;
  title: string;
  category: string;
  body: string;
};

export const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: "ig-guest-intro",
    title: "Instagram — Guest Spot Intro",
    category: "Instagram",
    body: `Hey! I'm a tattoo artist based in LA looking for guest spot opportunities. I've been following your shop and love the work coming out of there.

Would you be open to hosting a guest artist? Happy to send over my portfolio and availability. Thanks!`,
  },
  {
    id: "email-guest-intro",
    title: "Email — Guest Spot Intro",
    category: "Email",
    body: `Hi,

My name is [Your Name], and I'm a tattoo artist based in Los Angeles. I'm reaching out to see if you'd be open to hosting a guest spot at your shop.

I've attached / linked my portfolio below. I'd love to learn more about your process for guest artists and any available dates.

Portfolio: [link]
Instagram: @[handle]

Thank you for your time — looking forward to hearing from you.

Best,
[Your Name]`,
  },
  {
    id: "ig-follow-up",
    title: "Instagram — Follow-up",
    category: "Follow-up",
    body: `Hey! Just following up on my earlier message about a possible guest spot. Still very interested if you have any availability coming up. Happy to send more work or answer any questions. Thanks again!`,
  },
  {
    id: "email-follow-up",
    title: "Email — Follow-up",
    category: "Follow-up",
    body: `Hi,

Just circling back on my previous email about a guest spot / chair opportunity. I'm still very interested and flexible on timing.

Please let me know if you need anything else from me (portfolio, references, insurance, etc.).

Thanks again,
[Your Name]`,
  },
  {
    id: "chair-rental",
    title: "Chair Rental Inquiry",
    category: "Chair Rental",
    body: `Hi,

I'm a tattoo artist looking for a chair rental in the [Area] area. Could you share your current rates, what's included (booth, supplies, booking system), and any availability?

Happy to send my portfolio and discuss further.

Thanks,
[Your Name]`,
  },
  {
    id: "open-chair",
    title: "Open Chair Inquiry",
    category: "Open Chair",
    body: `Hey! Saw that you may have an open chair / are looking for artists. I'm based in LA and interested in learning more about the spot — vibe, days available, and how you typically bring artists on.

Can I send over my portfolio?

Thanks!`,
  },
  {
    id: "thank-you-booked",
    title: "Thank You — Booked",
    category: "Booked",
    body: `Amazing — thank you so much for having me! Looking forward to it.

Confirming dates: [dates]
I'll bring [supplies / portfolio / deposit info as needed].

See you soon!`,
  },
];

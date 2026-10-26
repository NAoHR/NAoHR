/*
 * The hero's three trips. Each is one payment crossing four systems, with the
 * message as it looks on each hop. The values are real field formats but
 * illustrative values, not any client's configuration:
 *
 * transfer  ISO 8583:1987. MTI 0200 = financial request, DE3 400000 =
 *           transfer, DE4 = amount in minor units (IDR has two decimals),
 *           MTI 0210 + DE39 00 = approved.
 * qris      EMVCo merchant QR: tag 53 = currency (360 = IDR), tag 54 =
 *           amount. DE3 000000 = purchase.
 * swift     MT103 single customer credit transfer: :23B:CRED = credit
 *           transfer, :71A:SHA = shared charges. MT910 = confirmation of
 *           credit.
 */
export interface Rail {
  id: string;
  label: string;
  standard: string;
  /** Read by screen readers in place of the diagram. */
  description: string;
  nodes: [string, string, string, string];
  hops: [Hop, Hop, Hop];
  /** The message that comes back. */
  reply: string;
  /** Text before the closing "balanced". */
  outcome: string;
}

interface Hop {
  format: string;
  lines: string[];
}

export const RAILS: Rail[] = [
  {
    id: "transfer",
    label: "Bank transfer",
    standard: "SNAP to ISO 8583",
    description:
      "A Rp150.000 transfer travelling from a mobile app through an API gateway and a switch to core banking",
    nodes: ["Mobile app", "API gateway", "Switch", "Core banking"],
    hops: [
      { format: "JSON", lines: ['"value": "150000.00"'] },
      { format: "ISO 8583", lines: ["0200", "DE3 400000"] },
      { format: "ISO 8583", lines: ["0200", "DE4 000015000000"] },
    ],
    reply: "0210 DE39 00",
    outcome: "Approved. Debit Rp150.000, credit Rp150.000:",
  },
  {
    id: "qris",
    label: "QR payment",
    standard: "QRIS",
    description:
      "A Rp150.000 QRIS payment travelling from a customer wallet through the issuer and the QRIS switch to the acquirer",
    nodes: ["Customer wallet", "Issuer", "QRIS switch", "Acquirer"],
    hops: [
      { format: "QR payload (EMVCo)", lines: ["5303360", "5406150000"] },
      { format: "ISO 8583", lines: ["0200", "DE3 000000"] },
      { format: "ISO 8583", lines: ["0200", "DE4 000015000000"] },
    ],
    reply: "0210 DE39 00",
    outcome: "Paid. Merchant credited Rp150.000:",
  },
  {
    id: "swift",
    label: "Cross-border",
    standard: "SWIFT MT103",
    description:
      "A USD1.000 cross-border transfer travelling from core banking through webMethods and SWIFT to a correspondent bank",
    nodes: ["Core banking", "webMethods", "SWIFT", "Correspondent"],
    hops: [
      { format: "File extract", lines: ["MT103"] },
      { format: "MT103", lines: [":23B:CRED"] },
      { format: "MT103", lines: [":71A:SHA"] },
    ],
    reply: "MT910",
    outcome: "Credit confirmed, USD1.000,00 on both books:",
  },
];

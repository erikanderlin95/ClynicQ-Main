export type HomeHealthcareKind = "doctor" | "care";
export interface HomeHealthcareProvider {
  id: string;
  nameKey: string;
  placeholder?: boolean;
  serviceKeys?: string[];
  coverageKey?: string;
  hoursKey?: string;
  feesKey?: string;
  bookingUrl?: string;
  phone?: string;
  whatsapp?: string;
  /** Uses the Book Appointment-style intake that hands off to WhatsApp. */
  houseCallIntake?: boolean;
}

// Kidney Life Centre official business WhatsApp — to be confirmed by the clinic. Leave empty until verified.
export const KIDNEY_LIFE_WHATSAPP = "";

export function houseCallWhatsAppUrl(number: string, patientName: string) {
  if (!/^\+?[0-9]{8,15}$/.test(number)) return null;
  const digits = number.replace(/^\+/, "");
  const to = digits.length === 8 ? `65${digits}` : digits;
  const text = encodeURIComponent(`Hi, I'd like to request a house call.\nName: ${patientName.trim()}`);
  return `https://wa.me/${to}?text=${text}`;
}

export const HOME_HEALTHCARE_ROUTES: Record<HomeHealthcareKind, string> = {
  doctor: "/house-call-doctors",
  care: "/home-care",
};

// Add verified provider records and their localized details here; never invent missing information.
export const HOME_HEALTHCARE_PROVIDERS: Record<HomeHealthcareKind, HomeHealthcareProvider[]> = {
  doctor: [{ id: "kidney-life-centre", nameKey: "kidneyLife.clinic", houseCallIntake: true }],
  care: [{ id: "care-placeholder", nameKey: "homeHealth.care.provider", placeholder: true }],
};

export function providerContacts(provider: HomeHealthcareProvider) {
  // Placeholders must never offer a booking or contact action.
  if (provider.placeholder) return [];
  const contacts: { key: string; href: string }[] = [];
  if (provider.bookingUrl?.startsWith("https://")) contacts.push({ key: "booking", href: provider.bookingUrl });
  if (provider.phone && /^\+?[0-9]{8,15}$/.test(provider.phone)) contacts.push({ key: "call", href: `tel:${provider.phone}` });
  if (provider.whatsapp && /^\+?[0-9]{8,15}$/.test(provider.whatsapp)) {
    const number = provider.whatsapp.replace(/^\+/, "");
    contacts.push({ key: "whatsapp", href: `https://wa.me/${number.length === 8 ? `65${number}` : number}` });
  }
  return contacts;
}

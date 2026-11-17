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
}

export const HOME_HEALTHCARE_ROUTES: Record<HomeHealthcareKind, string> = {
  doctor: "/house-call-doctors",
  care: "/home-care",
};

// Add verified provider records and their localized details here; never invent missing information.
export const HOME_HEALTHCARE_PROVIDERS: Record<HomeHealthcareKind, HomeHealthcareProvider[]> = {
  doctor: [{ id: "doctor-placeholder", nameKey: "homeHealth.doctor.provider", placeholder: true }],
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

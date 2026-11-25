import { test, expect } from "bun:test";
import { HOME_HEALTHCARE_ROUTES, HOME_HEALTHCARE_PROVIDERS, providerContacts, houseCallWhatsAppUrl } from "../data/homeHealthcare.ts";

test("home healthcare categories have separate requested listing URLs", () => {
  expect(HOME_HEALTHCARE_ROUTES.doctor).toBe("/house-call-doctors");
  expect(HOME_HEALTHCARE_ROUTES.care).toBe("/home-care");
});
test("unconfirmed providers are explicitly placeholders without invented contact details", () => {
  for (const kind of ["care"]) {
    expect(HOME_HEALTHCARE_PROVIDERS[kind]).toHaveLength(1);
    const provider = HOME_HEALTHCARE_PROVIDERS[kind][0];
    expect(provider.placeholder).toBe(true);
    expect(provider.feesKey).toBeUndefined();
    expect(providerContacts(provider)).toEqual([]);
  }
});
test("provider records accommodate booking, call and WhatsApp options", () => {
  expect(providerContacts({id:"verified",nameKey:"verified.name",bookingUrl:"https://example.com/book",phone:"+6591234567",whatsapp:"91234567"})).toEqual([
    { key: "booking", href: "https://example.com/book" },
    { key: "call", href: "tel:+6591234567" },
    { key: "whatsapp", href: "https://wa.me/6591234567" },
  ]);
});
test("phone options reject numbers outside the required format", () => {
  expect(providerContacts({id:"invalid",nameKey:"invalid.name",phone:"123",whatsapp:"9123 abc"})).toEqual([]);
});
test("Kidney Life Centre is the house-call doctor and uses the intake form", () => {
  expect(HOME_HEALTHCARE_PROVIDERS.doctor[0].id).toBe("kidney-life-centre");
  expect(HOME_HEALTHCARE_PROVIDERS.doctor[0].houseCallIntake).toBe(true);
});
test("house-call WhatsApp message only carries the patient name", () => {
  expect(houseCallWhatsAppUrl("91234567", " Tan Ah Kow ")).toBe("https://wa.me/6591234567?text=" + encodeURIComponent("Hi, I'd like to request a house call.\nName: Tan Ah Kow"));
  expect(houseCallWhatsAppUrl("", "Tan")).toBeNull();
});

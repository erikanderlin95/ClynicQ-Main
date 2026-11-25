import { Calendar, Phone, MessageCircle, Stethoscope, HeartHandshake } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { HOME_HEALTHCARE_PROVIDERS, providerContacts, type HomeHealthcareKind } from "@/data/homeHealthcare";
import "@/content/homeHealthcareTranslations";
import { KidneyLifeHouseCall } from "@/components/KidneyLifeHouseCall";

export default function HomeHealthcareListing({ kind }: { kind: HomeHealthcareKind }) {
  const { t } = useLanguage();
  const Icon = kind === "doctor" ? Stethoscope : HeartHandshake;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-5xl px-4 md:px-6 py-4 md:py-8">
        <header className="mb-5">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">{t(`homeHealth.${kind}.page`)}</h1>
          <p className="mt-1 text-sm md:text-base text-muted-foreground">{t(`homeHealth.${kind}.description`)}</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HOME_HEALTHCARE_PROVIDERS[kind].map(provider => {
            if (provider.houseCallIntake) return <KidneyLifeHouseCall key={provider.id} />;
            const contacts = providerContacts(provider);
            const fields = [
              ["homeHealth.services", provider.serviceKeys?.map(key => t(key)).join(" · ")],
              ["homeHealth.coverage", provider.coverageKey ? t(provider.coverageKey) : undefined],
              ["homeHealth.hours", provider.hoursKey ? t(provider.hoursKey) : undefined],
              [`homeHealth.${kind}.fees`, provider.feesKey ? t(provider.feesKey) : undefined],
            ];
            return (
              <article key={provider.id} className="rounded-lg border border-border bg-card p-4 text-card-foreground">
                <Icon className="h-6 w-6 text-primary mb-2" aria-hidden="true" />
                {provider.placeholder && <p className="mb-2 text-xs font-medium text-secondary-foreground bg-secondary rounded-md px-2 py-1 w-fit">{t("homeHealth.placeholder")}</p>}
                <h2 className="text-lg font-semibold leading-snug">{t(provider.nameKey)}</h2>
                <dl className="mt-3 space-y-2 text-sm">
                  {fields.map(([label, value]) => <div key={label}><dt className="font-medium text-foreground">{t(label)}</dt><dd className="text-muted-foreground break-words">{value || t("homeHealth.pending")}</dd></div>)}
                </dl>
                {contacts.length ? <div className="mt-4 flex flex-wrap gap-2">
                  {contacts.map(contact => {
                    const ContactIcon = contact.key === "call" ? Phone : contact.key === "booking" ? Calendar : MessageCircle;
                    return <Button key={contact.key} asChild className="h-auto min-h-10 whitespace-normal text-left"><a href={contact.href} target={contact.key === "call" ? undefined : "_blank"} rel={contact.key === "call" ? undefined : "noopener noreferrer"}><ContactIcon aria-hidden="true" />{t(`homeHealth.${contact.key}`)}</a></Button>;
                  })}
                </div> : <p className="mt-4 border-t border-border pt-3 text-sm text-muted-foreground">{t("homeHealth.contact.pending")}</p>}
              </article>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}

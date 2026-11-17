import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { HOME_HEALTHCARE_ROUTES, type HomeHealthcareKind } from "@/data/homeHealthcare";
import "@/content/homeHealthcareTranslations";
import doctorImage from "@/assets/home-healthcare/doctor-home-visit.jpg";
import careImage from "@/assets/home-healthcare/home-nursing-care.jpg";

const images = { doctor: doctorImage, care: careImage };
export function HealthcareAtHome() {
  const { t } = useLanguage();
  return (
    <section aria-labelledby="healthcare-at-home-heading" className="pt-6 md:pt-8">
      <header className="mb-4 text-center">
        <h2 id="healthcare-at-home-heading" className="text-xl md:text-2xl font-bold text-foreground leading-snug">{t("homeHealth.heading")}</h2>
        <p className="mt-1 text-sm md:text-base text-muted-foreground">{t("homeHealth.description")}</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 max-w-4xl mx-auto">
        {(["doctor", "care"] as HomeHealthcareKind[]).map(kind => (
          <Button key={kind} asChild variant="ghost" className="group block h-auto p-0 whitespace-normal rounded-lg overflow-hidden border border-border bg-card text-card-foreground hover:bg-card hover:border-primary focus-visible:ring-primary">
            <Link to={HOME_HEALTHCARE_ROUTES[kind]} className="flex items-stretch md:block">
              <img src={images[kind]} alt={t(`homeHealth.${kind}.alt`)} width={1280} height={720} loading="lazy" decoding="async" className="w-[104px] self-stretch object-cover shrink-0 md:w-full md:h-auto md:aspect-video" />
              <div className="flex-1 min-w-0 p-2.5 md:p-4 text-left">
                <h3 className="text-sm md:text-lg font-semibold leading-snug">{t(`homeHealth.${kind}.title`)}</h3>
                <p className="mt-0.5 text-xs md:text-sm text-muted-foreground font-normal">{t(`homeHealth.${kind}.description`)}</p>
                <span className="mt-1 inline-flex min-h-11 items-center justify-start gap-1.5 text-sm font-semibold text-primary md:mt-2">
                  {t(`homeHealth.${kind}.cta`)}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </section>
  );
}

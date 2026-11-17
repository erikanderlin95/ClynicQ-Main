import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { HOME_HEALTHCARE_ROUTES, type HomeHealthcareKind } from "@/data/homeHealthcare";
import "@/content/homeHealthcareTranslations";
import doctorImage from "@/assets/home-healthcare/doctor-home-visit.jpg";
import careImage from "@/assets/home-healthcare/home-nursing-care.jpg";

const images = { doctor: doctorImage, care: careImage };
const buttonStyles: Record<HomeHealthcareKind, string> = {
  doctor: "bg-home-doctor text-home-doctor-foreground group-hover:bg-home-doctor/90",
  care: "bg-home-care text-home-care-foreground group-hover:bg-home-care/90",
};

export function HealthcareAtHome() {
  const { t } = useLanguage();
  return (
    <section aria-labelledby="healthcare-at-home-heading" className="pt-6 md:pt-8">
      <header className="mb-4 text-center">
        <h2 id="healthcare-at-home-heading" className="text-xl md:text-2xl font-bold text-foreground leading-snug">{t("homeHealth.heading")}</h2>
        <p className="mt-1 text-sm md:text-base text-muted-foreground">{t("homeHealth.description")}</p>
      </header>
      <div className="flex flex-col gap-2 md:gap-4 max-w-2xl mx-auto">
        {(["doctor", "care"] as HomeHealthcareKind[]).map(kind => (
          <Button key={kind} asChild variant="ghost" className="group block h-auto p-0 whitespace-normal rounded-xl overflow-hidden border border-border bg-card text-card-foreground hover:bg-card hover:border-primary focus-visible:ring-primary">
            <Link to={HOME_HEALTHCARE_ROUTES[kind]} className="flex items-stretch">
              <img src={images[kind]} alt={t(`homeHealth.${kind}.alt`)} width={1280} height={720} loading="lazy" decoding="async" className="w-[104px] md:w-44 self-stretch object-cover shrink-0" />
              <div className="flex-1 min-w-0 p-2.5 md:p-5 text-left flex flex-col justify-center">
                <h3 className="text-sm md:text-lg font-semibold leading-snug">{t(`homeHealth.${kind}.title`)}</h3>
                <p className="mt-0.5 text-xs md:text-sm text-muted-foreground font-normal">{t(`homeHealth.${kind}.description`)}</p>
                <span className={`mt-2 inline-flex min-h-8 self-start items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold md:mt-3 md:min-h-10 md:gap-2 md:px-4 md:py-2 md:text-sm ${buttonStyles[kind]}`}>
                  {t(`homeHealth.${kind}.cta`)}
                </span>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </section>
  );
}

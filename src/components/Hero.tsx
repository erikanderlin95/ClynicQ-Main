import { Button } from "@/components/ui/button";
import { Building2, Compass, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { QueueJoinCounter } from "@/components/QueueJoinCounter";

export const Hero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-white py-8 md:py-12">
      <div className="absolute inset-0 bg-[linear-gradient(105deg,hsl(168,55%,84%)_0%,hsl(175,55%,92%)_22%,hsl(190,50%,97%)_50%,hsl(200,60%,94%)_78%,hsl(210,65%,86%)_100%)]" />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 700" aria-hidden="true">
        <defs>
          <linearGradient id="heroWaveL" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(168,60%,78%)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(180,60%,90%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroWaveR" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(205,70%,82%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(195,65%,92%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroWaveR2" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="hsl(200,70%,78%)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="hsl(195,60%,92%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,0 Q380,180 240,420 Q120,640 0,700 L0,0 Z" fill="url(#heroWaveL)" />
        <path d="M0,80 Q300,260 200,500 Q100,640 0,700 L0,80 Z" fill="url(#heroWaveL)" opacity="0.6" />
        <path d="M1440,0 Q1100,200 1240,440 Q1340,620 1440,700 L1440,0 Z" fill="url(#heroWaveR)" />
        <path d="M1440,120 Q1180,300 1280,520 Q1360,640 1440,700 L1440,120 Z" fill="url(#heroWaveR2)" opacity="0.7" />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,hsl(0,0%,100%,0.55),transparent_75%)]" />
      <div className="container relative z-10 px-4 md:px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center space-y-4 text-center md:space-y-5">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              {t("hero.title1")}
              <span className="mt-1 block bg-gradient-to-r from-[hsl(220,90%,58%)] via-[hsl(215,90%,55%)] to-[hsl(210,90%,55%)] bg-clip-text text-transparent sm:mt-2">
                {t("hero.title2")}
              </span>
            </h1>
            {(() => {
              const [line1, line2] = t("hero.subtitle").split("\n");
              return (
                <div className="space-y-1 pt-1">
                  <p className="text-sm leading-snug text-foreground/80 sm:text-base md:text-lg">
                    {line1}
                  </p>
                  <p className="whitespace-nowrap text-sm leading-snug text-foreground/80 sm:text-base md:text-lg">
                    {line2 || ""}
                  </p>
                </div>
              );
            })()}
          </div>

          <QueueJoinCounter />

          <div className="mx-auto flex flex-col justify-center gap-2.5 sm:flex-row sm:gap-3">
            <Button
              size="lg"
              className="explore-cta group h-auto min-h-10 w-auto gap-1.5 px-5 py-2.5 text-sm font-bold leading-tight ring-2 ring-primary/40 ring-offset-2 ring-offset-transparent transition-colors duration-200 hover:bg-primary/95 sm:min-h-12 sm:px-6 sm:py-3 sm:text-base"
              onClick={() => window.dispatchEvent(new CustomEvent('open-explore-sidebar'))}
            >
              <Compass className="h-3.5 w-3.5 shrink-0 transition-transform duration-500 group-hover:rotate-45 sm:h-4 sm:w-4" />
              <span className="min-w-0 break-words">{t("hero.findClinics")}</span>
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/25">
                <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-auto min-h-10 w-auto gap-1.5 border-primary px-5 py-2.5 text-sm font-bold leading-tight text-primary shadow-lg transition-all hover:scale-105 hover:bg-primary/5 hover:shadow-xl sm:min-h-12 sm:px-6 sm:py-3 sm:text-base"
              onClick={() => navigate('/for-clinics')}
            >
              <Building2 className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              <span className="min-w-0 break-words">{t("hero.findMyQueue")}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

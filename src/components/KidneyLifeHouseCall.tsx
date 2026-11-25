import { useState } from "react";
import { MapPin, Clock, Stethoscope, Info } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useLanguage } from "@/contexts/LanguageContext";
import { KIDNEY_LIFE_WHATSAPP, houseCallWhatsAppUrl } from "@/data/homeHealthcare";
import logo from "@/assets/home-healthcare/kidney-life-logo.jpg.asset.json";
import photo from "@/assets/home-healthcare/dr-yang-wen-shin.jpg.asset.json";
import "@/content/kidneyLifeTranslations";

const validMobile = (m: string) => /^\+?[0-9]{8,15}$/.test(m.trim().replace(/[\s-]/g, ""));

// Mirrors the Book Appointment intake; nothing is stored — details only prefill the WhatsApp message.
export function KidneyLifeHouseCall() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"form" | "ready">("form");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [notes, setNotes] = useState("");
  const [agree, setAgree] = useState(false);
  const [consent, setConsent] = useState(false);
  const waUrl = houseCallWhatsAppUrl(KIDNEY_LIFE_WHATSAPP, name);

  const reset = () => { setStep("form"); setName(""); setMobile(""); setNotes(""); setAgree(false); setConsent(false); };
  const submit = () => {
    if (!name.trim() || !mobile.trim()) return toast.error(t("kidneyLife.errFill"));
    if (!validMobile(mobile)) return toast.error(t("kidneyLife.errMobile"));
    setStep("ready");
  };

  return (
    <article className="overflow-hidden rounded-xl border border-home-kidney/30 bg-card text-card-foreground md:col-span-2 md:max-w-xl">
      <img src={logo.url} alt={t("kidneyLife.logoAlt")} className="h-16 w-full object-contain bg-home-kidney px-2 py-0" loading="lazy" />
      <div className="p-2.5 md:p-3">
        <div className="flex items-center gap-2.5">
          <img src={photo.url} alt={t("kidneyLife.photoAlt")} className="h-12 w-12 shrink-0 rounded-full object-cover border-2 border-home-kidney/40" loading="lazy" />
          <div className="min-w-0">
            <h2 className="text-base font-semibold leading-tight">{t("kidneyLife.doctor")}</h2>
            <p className="text-sm text-foreground font-medium leading-snug">{t("kidneyLife.clinic")}</p>
          </div>
        </div>
        <ul className="mt-2 space-y-0.5 text-[13px] leading-snug text-foreground">
          <li className="flex gap-2"><Stethoscope className="h-4 w-4 mt-0.5 shrink-0 text-home-kidney" aria-hidden="true" />{t("kidneyLife.service")}</li>
          <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-home-kidney" aria-hidden="true" />{t("kidneyLife.coverage")}</li>
          <li className="flex gap-2"><Clock className="h-4 w-4 mt-0.5 shrink-0 text-home-kidney" aria-hidden="true" />{t("kidneyLife.availability")}</li>
        </ul>
        <div className="mt-2 rounded-lg border border-home-kidney/25 bg-home-kidney-soft p-2 text-[11px] leading-snug text-foreground">
          <p className="flex gap-1.5"><Info className="h-3.5 w-3.5 mt-0.5 shrink-0 text-home-kidney" aria-hidden="true" /><span>{t("kidneyLife.disclaimer")}</span></p>
          <p className="mt-1 pl-5 text-muted-foreground">{t("kidneyLife.enrolment")}</p>
        </div>
        <Button onClick={() => { reset(); setOpen(true); }} className="mt-2 w-full h-9 bg-home-kidney text-home-kidney-foreground hover:bg-home-kidney/90 font-semibold">
          {t("kidneyLife.request")}
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm max-h-[90vh] overflow-y-auto">
          {step === "form" ? <>
            <DialogHeader>
              <DialogTitle className="text-base">{t("kidneyLife.formTitle")}</DialogTitle>
              <DialogDescription className="text-xs">{t("kidneyLife.formDesc")}</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label htmlFor="hc-name" className="text-xs font-medium">{t("kidneyLife.name")} <span className="text-muted-foreground font-normal">{t("kidneyLife.nameHint")}</span> *</Label>
                <Input id="hc-name" value={name} onChange={e => setName(e.target.value)} placeholder={t("kidneyLife.namePh")} className="mt-1 h-9 text-sm" />
              </div>
              <div>
                <Label htmlFor="hc-mobile" className="text-xs font-medium">{t("kidneyLife.mobile")} *</Label>
                <Input id="hc-mobile" type="tel" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="e.g. +6591234567" className="mt-1 h-9 text-sm" />
                <p className="text-[10px] text-muted-foreground mt-0.5">{t("kidneyLife.mobileHint")}</p>
              </div>
              <div>
                <Label htmlFor="hc-notes" className="text-xs font-medium">{t("kidneyLife.notes")}</Label>
                <Textarea id="hc-notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder={t("kidneyLife.notesPh")} className="mt-1 text-sm min-h-[60px]" />
              </div>
              <div className="p-2.5 rounded-md bg-muted/50 border border-border/40 space-y-1.5">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{t("kidneyLife.note")}</p>
                <ul className="space-y-1 text-[11px] text-muted-foreground list-disc pl-3.5">
                  {[1, 2, 3, 4].map(i => <li key={i}>{t(`kidneyLife.note${i}`)}</li>)}
                </ul>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="hc-agree" checked={agree} onCheckedChange={c => setAgree(c === true)} className="mt-0.5" />
                <Label htmlFor="hc-agree" className="text-[11px] font-medium cursor-pointer leading-tight">{t("kidneyLife.agree")}</Label>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-start gap-2">
                  <Checkbox id="hc-consent" checked={consent} onCheckedChange={c => setConsent(c === true)} className="mt-0.5" />
                  <Label htmlFor="hc-consent" className="text-[11px] font-medium cursor-pointer leading-tight">
                    {t("kidneyLife.consent")}{" "}<a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline text-primary">{t("kidneyLife.privacy")}</a>.
                  </Label>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">{t("kidneyLife.emergency")}</p>
              </div>
            </div>
            <DialogFooter className="gap-2 pt-1">
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>{t("kidneyLife.cancel")}</Button>
              <Button size="sm" onClick={submit} disabled={!agree || !consent} className="bg-home-kidney text-home-kidney-foreground hover:bg-home-kidney/90 font-bold">{t("kidneyLife.continue")}</Button>
            </DialogFooter>
          </> : <>
            <DialogHeader>
              <DialogTitle className="text-base">{t("kidneyLife.readyTitle")}</DialogTitle>
              <DialogDescription className="text-xs">{t("kidneyLife.readyDesc")}</DialogDescription>
            </DialogHeader>
            {waUrl ? (
              <Button asChild className="w-full h-10 bg-home-care text-home-care-foreground hover:bg-home-care/90 font-semibold">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}><WhatsAppIcon className="h-4 w-4" />{t("kidneyLife.whatsapp")}</a>
              </Button>
            ) : (
              <>
                <Button disabled className="w-full h-10 font-semibold"><WhatsAppIcon className="h-4 w-4" />{t("kidneyLife.whatsapp")}</Button>
                <p className="text-xs text-muted-foreground text-center">{t("kidneyLife.whatsappPending")}</p>
              </>
            )}
          </>}
        </DialogContent>
      </Dialog>
    </article>
  );
}

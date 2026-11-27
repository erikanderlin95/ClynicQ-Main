import { registerArticleTranslations } from "./translationRegistry";

const en = {
  "queueJoinCounter.label": "Queue joins across our clinic network",
  "queueJoinCounter.adminTitle": "Total Queue Joins",
  "queueJoinCounter.preview": "Preview placeholder",
  "queueJoinCounter.unavailable": "Live count unavailable",
};

const zh: Record<keyof typeof en, string> = {
  "queueJoinCounter.label": "我们诊所网络的累计排队加入次数",
  "queueJoinCounter.adminTitle": "累计排队加入次数",
  "queueJoinCounter.preview": "预览占位数据",
  "queueJoinCounter.unavailable": "实时计数暂不可用",
};

const ms: Record<keyof typeof en, string> = {
  "queueJoinCounter.label": "Penyertaan giliran merentas rangkaian klinik kami",
  "queueJoinCounter.adminTitle": "Jumlah Penyertaan Giliran",
  "queueJoinCounter.preview": "Data contoh pratonton",
  "queueJoinCounter.unavailable": "Bilangan langsung tidak tersedia",
};

const ta: Record<keyof typeof en, string> = {
  "queueJoinCounter.label": "எங்கள் கிளினிக் வலையமைப்பில் வரிசையில் சேர்ந்தவை",
  "queueJoinCounter.adminTitle": "மொத்த வரிசைச் சேர்க்கைகள்",
  "queueJoinCounter.preview": "முன்னோட்ட மாதிரித் தரவு",
  "queueJoinCounter.unavailable": "நேரடி எண்ணிக்கை கிடைக்கவில்லை",
};

registerArticleTranslations({ en, zh, ms, ta });

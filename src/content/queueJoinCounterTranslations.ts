import { registerArticleTranslations } from "./translationRegistry";

const en = {
  "queueJoinCounter.label": "Queue joins across our network",
  "queueJoinCounter.since": "Since September 2026",
  "queueJoinCounter.adminTitle": "Total Queue Joins",
  "queueJoinCounter.unavailable": "Live count unavailable",
};

const zh: Record<keyof typeof en, string> = {
  "queueJoinCounter.label": "我们网络的累计排队加入次数",
  "queueJoinCounter.since": "自 2026 年 9 月起",
  "queueJoinCounter.adminTitle": "累计排队加入次数",
  "queueJoinCounter.unavailable": "实时计数暂不可用",
};

const ms: Record<keyof typeof en, string> = {
  "queueJoinCounter.label": "Penyertaan giliran merentas rangkaian kami",
  "queueJoinCounter.since": "Sejak September 2026",
  "queueJoinCounter.adminTitle": "Jumlah Penyertaan Giliran",
  "queueJoinCounter.unavailable": "Bilangan langsung tidak tersedia",
};

const ta: Record<keyof typeof en, string> = {
  "queueJoinCounter.label": "எங்கள் வலையமைப்பில் வரிசையில் சேர்ந்தவை",
  "queueJoinCounter.since": "செப்டம்பர் 2026 முதல்",
  "queueJoinCounter.adminTitle": "மொத்த வரிசைச் சேர்க்கைகள்",
  "queueJoinCounter.unavailable": "நேரடி எண்ணிக்கை கிடைக்கவில்லை",
};

registerArticleTranslations({ en, zh, ms, ta });

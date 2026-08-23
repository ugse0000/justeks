import type { FormContent } from '../schema'

/** Her formun paylaştığı etiketler; aynı alan iki türlü okunmasın. */
const shared = {
  companyName: 'Firma adı',
  contactName: 'Adınız',
  email: 'E-posta adresi',
  phone: 'Telefon',
  country: 'Ülke',
  city: 'Şehir',
  message: 'Mesaj',
}

const outcome = {
  submitLabel: 'Talebi gönder',
  submittingLabel: 'Gönderiliyor…',
  successHeading: 'Talebiniz alındı',
  successBody: 'Talebiniz bize ulaştı; bir iş günü içinde döneceğiz. Referansınız:',
  errorHeading: 'Gönderemedik',
  errorBody: 'Lütfen aşağıda işaretlenen alanları kontrol edip tekrar deneyin.',
  fallbackLinkLabel: 'E-posta ile yazın',
  fileHint: 'PDF, JPG, PNG, WEBP, HEIC, XLSX veya DOCX. En fazla 5 dosya, her biri 10 MB.',
}

export const forms: Record<string, FormContent> = {
  contact: {
    heading: 'Talep gönderin',
    lead: 'Uygun konuyu seçin; talebinizi doğru birime yönlendirelim.',
    labels: { ...shared, type: 'Konu' },
    topics: [
      { value: 'SALES', label: 'Satış ve fiyatlandırma',
        description: 'Toptan fiyat, minimum miktar ve stok durumu' },
      { value: 'SAMPLING', label: 'Numune',
        description: 'Kartela, askı ve numune metrajı' },
      { value: 'SOURCING', label: 'Tedarik',
        description: 'Ürün yelpazemizde bulamadığınız bir kumaş' },
      { value: 'INTERNATIONAL_TRADE', label: 'Dış ticaret',
        description: 'Incoterms, sevkiyat ve evraklar' },
      { value: 'TECHNICAL', label: 'Teknik',
        description: 'Kompozisyon, gramaj, apre ve performans verileri' },
      { value: 'GENERAL', label: 'Genel',
        description: 'Diğer konular' },
    ],
    ...outcome,
  },

  sourcing: {
    heading: 'Aradığınız kumaşı anlatın',
    lead: 'Kumaş hakkında ne kadar çok bilgi verirseniz, o kadar hızlı buluruz.',
    labels: {
      ...shared,
      fabricType: 'Kumaş türü',
      composition: 'Kompozisyon',
      gsm: 'Gramaj (GSM)',
      width: 'En',
      colour: 'Renk',
      application: 'Kullanım alanı',
      requiredQuantity: 'İhtiyaç duyulan miktar',
      deliveryCountry: 'Teslimat ülkesi',
      requiredDate: 'İhtiyaç tarihi',
      files: 'Ekler',
    },
    ...outcome,
    submitLabel: 'Tedarik talebi gönder',
  },

  bulk: {
    heading: 'Toplu sipariş ihtiyacı',
    lead: 'Teknik özellikleri ve miktarı iletin; termin ve fiyatla dönelim.',
    labels: {
      ...shared,
      articleOrFabric: 'Ürün kodu veya kumaş',
      composition: 'Kompozisyon',
      colour: 'Renk',
      gsm: 'Gramaj (GSM)',
      width: 'En',
      requiredQuantity: 'İhtiyaç duyulan miktar',
      requiredDeliveryDate: 'İstenen teslim tarihi',
      deliveryCountry: 'Teslimat ülkesi',
      deliveryCity: 'Teslimat şehri',
      productionApplication: 'Üretim alanı',
    },
    ...outcome,
    submitLabel: 'İhtiyacı gönder',
  },

  tradeAccount: {
    heading: 'Ticari hesap başvurusu',
    lead: 'Ticari hesaplar, toptan hacimlerde alım yapan kayıtlı işletmeler içindir.',
    labels: {
      ...shared,
      companyRegistration: 'Ticaret sicil numarası',
      vatNumber: 'Vergi numarası',
      businessType: 'Faaliyet alanı',
      companyWebsite: 'Firma web sitesi',
      annualVolumeEstimate: 'Tahmini yıllık hacim',
    },
    ...outcome,
    submitLabel: 'Başvuruyu gönder',
    successBody: 'Başvurunuz bize ulaştı; iki iş günü içinde sizinle iletişime geçeceğiz. Referansınız:',
  },
}

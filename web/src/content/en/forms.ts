import type { FormContent } from '../schema'

/** Labels every form shares, so the same field never reads two ways. */
const shared = {
  companyName: 'Company name',
  contactName: 'Your name',
  email: 'Email address',
  phone: 'Telephone',
  country: 'Country',
  city: 'City',
  message: 'Message',
}

const outcome = {
  submitLabel: 'Send enquiry',
  submittingLabel: 'Sending…',
  successHeading: 'Enquiry received',
  successBody: 'We have your enquiry and will reply within one working day. Your reference is',
  errorHeading: 'We could not send that',
  errorBody: 'Please check the fields marked below and try again.',
  fallbackLinkLabel: 'Email us instead',
  fileHint: 'PDF, JPG, PNG, WEBP, HEIC, XLSX or DOCX. Up to 5 files, 10 MB each.',
}

export const forms: Record<string, FormContent> = {
  contact: {
    heading: 'Send an enquiry',
    lead: 'Choose the subject that fits and we will route it to the right desk.',
    labels: { ...shared, type: 'Subject' },
    topics: [
      { value: 'SALES', label: 'Sales and pricing',
        description: 'Wholesale prices, minimums and availability' },
      { value: 'SAMPLING', label: 'Samples',
        description: 'Swatches, hangers and sample lengths' },
      { value: 'SOURCING', label: 'Sourcing',
        description: 'A fabric you cannot find in our range' },
      { value: 'INTERNATIONAL_TRADE', label: 'International trade',
        description: 'Incoterms, shipping and documentation' },
      { value: 'TECHNICAL', label: 'Technical',
        description: 'Composition, weight, finish and performance data' },
      { value: 'GENERAL', label: 'General',
        description: 'Anything else' },
    ],
    ...outcome,
  },

  sourcing: {
    heading: 'Tell us what you are looking for',
    lead: 'The more you can tell us about the cloth, the faster we can find it.',
    labels: {
      ...shared,
      fabricType: 'Fabric type',
      composition: 'Composition',
      gsm: 'Weight (GSM)',
      width: 'Width',
      colour: 'Colour',
      application: 'End use',
      requiredQuantity: 'Quantity required',
      deliveryCountry: 'Delivery country',
      requiredDate: 'Required by',
      files: 'Attachments',
    },
    ...outcome,
    submitLabel: 'Send sourcing request',
  },

  bulk: {
    heading: 'Bulk requirement',
    lead: 'Give us the specification and volume, and we will come back with lead time and pricing.',
    labels: {
      ...shared,
      articleOrFabric: 'Article or fabric',
      composition: 'Composition',
      colour: 'Colour',
      gsm: 'Weight (GSM)',
      width: 'Width',
      requiredQuantity: 'Quantity required',
      requiredDeliveryDate: 'Required delivery date',
      deliveryCountry: 'Delivery country',
      deliveryCity: 'Delivery city',
      productionApplication: 'Production application',
    },
    ...outcome,
    submitLabel: 'Send requirement',
  },

  tradeAccount: {
    heading: 'Apply for a trade account',
    lead: 'Trade accounts are for registered businesses buying at wholesale volumes.',
    labels: {
      ...shared,
      companyRegistration: 'Company registration number',
      vatNumber: 'VAT number',
      businessType: 'Type of business',
      companyWebsite: 'Company website',
      annualVolumeEstimate: 'Estimated annual volume',
    },
    ...outcome,
    submitLabel: 'Submit application',
    successBody: 'We have your application and will be in touch within two working days. Your reference is',
  },
}

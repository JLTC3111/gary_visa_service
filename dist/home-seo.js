import {ui} from './content.js';

export const visaOrigin = 'https://visa.garyhome.vn';
export const homePath = language => language === 'vi' ? '/vi' : '/';
export const homeSeo = language => ({
  title: language === 'vi'
    ? 'Dịch vụ visa và giấy phép lao động tại Việt Nam | Gary Agency'
    : 'Visa & Work Permit Services in Vietnam | Gary Agency',
  description: ui[language].metaDescription,
  url: visaOrigin + homePath(language),
  locale: language === 'vi' ? 'vi_VN' : 'en_US',
});

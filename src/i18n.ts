import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      accounts: 'Accounts',
      add: 'Add',
      logout: 'Logout',
      login: 'Login',
      'Add TOTP Account': 'Add TOTP Account',
      'Edit TOTP Account': 'Edit TOTP Account',
      Name: 'Name',
      'Base32 Secret': 'Base32 Secret'
    }
  },
  ru: {
    translation: {
      accounts: 'Аккаунты',
      add: 'Добавить',
      logout: 'Выйти',
      login: 'Войти',
      'Add TOTP Account': 'Добавить TOTP аккаунт',
      'Edit TOTP Account': 'Редактировать TOTP аккаунт',
      Name: 'Имя',
      'Base32 Secret': 'Base32 секрет'
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

export default i18n

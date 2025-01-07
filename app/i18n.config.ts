import en from '~/lang/en-US.js'
import th from '~/lang/th-TH.js'

// You can use `defineI18nConfig` to get type inferences for options to pass to vue-i18n.
export default defineI18nConfig(() => {
    return {
        legacy: false,
        lazy: true,
        locale: 'th',
        messages: {
            en,
            th
        }
    }
})

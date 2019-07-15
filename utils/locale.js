export const autoUnit = () => {
    if (navigator) {
        const userLang = navigator.language || navigator.userLanguage
        if (userLang.match(/US|us/)) {
        return 'mi'
        }
    }
    return 'km'
}
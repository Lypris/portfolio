import { useRouter } from 'next/router'

export default function LanguageSwitcher() {
  const router = useRouter()
  const { pathname, asPath, query } = router

  const changeLanguage = (locale: string) => {
    router.push({ pathname, query }, asPath, { locale })
  }

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('fr')}>Français</button>
    </div>
  )
}

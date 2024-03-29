import { faCookie } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion, useAnimation, useCycle } from "framer-motion"
import { useEffect, useState } from "react"
import { Link } from "@remix-run/react"
import { useShopifyCookies, getShopifyCookies } from "@shopify/hydrogen"

const cookieWrapper__variants = {
    hidden: { width: "0%", height: "0%", transition: { staggerChildren: 0.1, when: "afterChildren", ease: "easeOut", staggerDirection: -1 } },
    open: { width: "100%", height: "100%", transition: { staggerChildren: 0.2, when: "beforeChildren", ease: "easeIn" } }
}

const modal__variants = {
    hidden: { opacity: 0, scaleX: 0, transition: { staggerChildren: 0.1, when: "afterChildren", ease: "easeOut", staggerDirection: -1 } },
    open: { opacity: 1, scaleX: 1, transition: { staggerChildren: 0.2, when: "beforeChildren", ease: "easeIn" } }
}

const element__variants = {
    hidden: { opacity: 0, x: -10, transition: { ease: "easeOut" } },
    open: { opacity: 1, x: 0, transition: { ease: "easeIn" } }
}

export function CookieConsent() {
    const [closed, setClosed] = useState(true)
    const controls = useAnimation()
    const [check, setCheck] = useState(false);
    const [consent, setConsent] = useState(false)
    useShopifyCookies({ hasUserConsent: consent });

    useEffect(() => { handleCookieOpen() }, [])

    useEffect(() => {
        check && controls.start(closed ? "hidden" : "open")
        // const get = getShopifyCookies(document.cookie)
        // console.log(closed, get, document.cookie)
    }, [closed])

    const handleCookieClose = () => setClosed(true)
    const handleCookieOpen = () => {
        if (typeof window !== 'undefined') {
            let cookieName: any = getCookie("cookiePolicy")
            if (cookieName !== null) {
                //if cookie = present, hide banner
                console.log("present")
                setClosed(true)
            } else {
                setClosed(false)
                console.log("not present")
            }
            setCheck(true)
        }
    }

    function getCookie(name: any) {
        if (typeof window !== 'undefined') {
            var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
            return match ? match[1] : null;
        }
    }

    const handleCookieAccepted = () => {
        if (typeof window !== 'undefined') {
            setConsent(true)
            const expiry = new Date()
            // save cookie for 1 month
            expiry.setTime(expiry.getTime() + (30 * 24 * 60 * 60 * 1000))
            let expires = " expires=" + expiry.toUTCString() + ";"
            document.cookie = "cookiePolicy=accepted;" + expires + "; Secure; SameSite=None; path=/";
            setClosed(true)
        }
    }
    const handleCookieDeclined = () => {
        if (typeof window !== 'undefined') {
            setConsent(false)
            setClosed(true)
            //let us save the cookie for the current session only
            //use the default expiry : session
            document.cookie = "cookiePolicy=declined" + "; Secure; SameSite=None; path=/";
        }
    }
    return (<>
        <motion.div initial="hidden" animate={controls} variants={cookieWrapper__variants} className='origin-bottom-left flex justify-center items-center fixed bottom-0 left-0 w-full h-full overflow-hidden backdrop-blur-lg z-30'>
            <motion.div variants={modal__variants} className='p-6 flex flex-col justify-start items-center w-full h-full max-h-[700px] max-w-[500px] bg-[#0d0d0d]'>
                <motion.p variants={element__variants} className='m-0'>Wir verwenden</motion.p>
                <motion.h2 variants={element__variants} className='m-0'>Cookies</motion.h2>
                <motion.p className='text-base py-4' variants={element__variants}>
                    Diese Website nutzt Cookies und vergleichbare Funktionen zur Verarbeitung von Endgeräteinformationen und personenbezogenen Daten. Die Verarbeitung dient der Einbindung von Inhalten, externen Diensten und Elementen Dritter, der statistischen Analyse/Messung, der personalisierten Werbung oder des Remarketings sowie der Einbindung sozialer Medien. Je nach Funktion werden dabei Daten an Dritte weitergegeben innerhalb der EU. Ihre Einwilligung ist stets freiwillig, für die Nutzung unserer Website nicht erforderlich und kann jederzeit über das Icon unten links abgelehnt oder widerrufen werden.
                </motion.p>
                <motion.div variants={modal__variants} className='mt-auto flex flex-wrap gap-4 justify-between w-full my-4'>
                    <motion.button variants={element__variants} type='button' aria-label='Accept cookies' className='border border-white-100 p-4 cursor-pointer bg-white text-black font-bold rounded flex-auto' onClick={handleCookieAccepted}>Zustimmen</motion.button>
                    <motion.button variants={element__variants} type='button' aria-label='Decline cookies' className='border border-white-100 p-4 cursor-pointer bg-none text-white font-bold rounded flex-auto' onClick={handleCookieDeclined}>Ablehnen</motion.button>
                </motion.div>
                <motion.ul variants={modal__variants} className='flex flex-wrap gap-4 justify-between w-full my-4'>
                    <motion.li onClick={() => setClosed(!closed)}><Link className='underline-offset-1' to="/Impressum">Impressum</Link></motion.li>
                    <motion.li onClick={() => setClosed(!closed)}><Link className='underline-offset-1' to="/Datenschutz">Datenschutz</Link></motion.li>
                    <motion.li onClick={() => setClosed(!closed)}><Link className='underline-offset-1' to="/AGB">AGB</Link></motion.li>
                </motion.ul>
            </motion.div>
        </motion.div>
        <motion.div
            onClick={() => setClosed(!closed)}
            className='z-40 flex flex-row justify-center m-2 rounded bg-[#0f0f0f] items-center cursor-pointer w-auto h-12 fixed bottom-0 left-0'>
            <FontAwesomeIcon className='w-12' icon={faCookie} />
        </motion.div>
    </>
    )
}





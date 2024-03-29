
import { Carousel } from "../components copy/Carousel"
import { SDiv } from "../components copy/ScrollDiv";
import { globalScroll } from "../components copy/atoms";
import { motion, useScroll, useSpring } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

import { currentSection } from "../components copy/atoms";
import Footer from "../components copy/Footer";
import React from "react";

export default function About() {
    const ref = useRef<any>(!null);
    const progress = useRef<any>(!null);
    const scroll: any = useRef<any>(0);
    const [gScroll, setgScroll] = useAtom(globalScroll)
    const [sectionCurrent, setSection] = useAtom(currentSection)
    const { scrollYProgress }: any = useScroll({ container: ref })
    const scaleX = useSpring(scrollYProgress)
    const x = useSpring(scrollYProgress)

    useEffect(() => {
        setgScroll(scroll)
    }, [scroll]);

    const names =
        [
            {
                first: {
                    header: "Hi, ich bin Stephan!",
                    text: "Seit 2009 übe ich mit Hingabe und Begeisterung den Beruf des Friseurs aus und führe seit 2018 meinen eigenen Salon. Meine Leidenschaft für dieses Handwerk ist nicht nur eine Karriere, sondern eine Lebensweise, die es mir ermöglicht, Menschen glücklich zu machen und ihnen ein strahlendes Lächeln ins Gesicht zu zaubern."
                }
            }, {
                second: {
                    header: "Der Kunde ist König",
                    text: "Bei mir steht der Kunde im Mittelpunkt. Mein oberstes Ziel ist es, Ihre individuellen Wünsche und Bedürfnisse zu verstehen und diese in einzigartige Frisuren umzusetzen, die Ihre Persönlichkeit unterstreichen. Egal, ob Sie eine klassische oder moderne Frisur bevorzugen, ob Sie eine Veränderung wünschen oder einfach nur verwöhnt werden möchten, ich stehe Ihnen mit Rat und Tat zur Seite."
                }
            }, {
                third: {
                    header: "Top Qualität",
                    text: "Mein Team und ich legen großen Wert auf Qualität und Innovation. Wir bleiben stets auf dem neuesten Stand der Trends und Techniken, um Ihnen die bestmöglichen Ergebnisse zu liefern. Wir verwenden hochwertige Produkte, die Ihrem Haar die Pflege und Aufmerksamkeit schenken, die es verdient. Ihre Zufriedenheit steht für uns an erster Stelle. Neben erstklassigen Haarschnitten bieten wir auch eine Vielzahl weiterer Services an."
                }
            }
            , {
                fourth: {
                    header: "Was das Herz begehrt",
                    text: "Unsere Leistungen umfassen unter anderem professionelles Styling für besondere Anlässe, Farbveränderungen, Haarverlängerungen und - verdichtungen sowie entspannende Kopf - und Haarpflegebehandlungen. In unserem Salon können Sie sich verwöhnen lassen und eine Auszeit vom Alltag genießen."
                }
            }, {
                fifth: {
                    header: "Mehr als ein Haarschnitt",
                    text: "In unserem Salon erwartet Sie nicht nur ein Friseurbesuch, sondern ein einzigartiges Erlebnis. Unsere angenehme und entspannte Atmosphäre lässt Sie den Stress des Tages vergessen und sich vollkommen fallen lassen. Wir legen großen Wert auf eine persönliche und individuelle Betreuung, um sicherzustellen, dass Sie sich bei uns rundum wohl fühlen. Kundenfeedback ist uns besonders wichtig."
                }
            }, {
                sixth: {
                    header: "Feedback",
                    text: "Wir freuen uns über jede Rückmeldung, denn sie hilft uns dabei uns kontinuierlich zu verbessern und unsere Dienstleistungen an Ihre Bedürfnisse anzupassen. Ihr Vertrauen ist für uns die größte Motivation, unsere Leidenschaft für den Friseurberuf Tag für Tag zu leben."
                }
            }, {
                seventh: {
                    header: "Hi, ich bin Simon!",
                    text: "Seit 2020 bin ich stolz darauf Teil dieses wunderbaren Salons zu sein und meiner Leidenschaft für das Friseurhandwerk nachzugehen. Die Arbeit als Friseur erfüllt mich mit Freude und Begeisterung, und ich strebe danach, das Beste aus jedem meiner Kunden herauszuholen. Mein Ziel ist es, Ihnen ein außergewöhnliches Erlebnis zu bieten und Ihnen mit meiner Expertise zu einem unverwechselbaren Look zu verhelfen."
                }
            }, {
                eighth: {
                    header: "Immer up to date",
                    text: "Für mich ist es von großer Bedeutung, mich stetig weiterzubilden und mit den neuesten Trends und Techniken vertraut zu sein. Die Friseurbranche ist dynamisch und entwickelt sich kontinuierlich weiter. Daher investiere ich viel Zeit und Energie in meine Weiterbildung, um sicherzustellen, dass ich Ihnen immer die aktuellsten und innovativsten Lösungen bieten kann. Durch regelmäßige Schulungen und Workshops halte ich mich über die neuesten Schnitt - und Stylingtechniken auf dem Laufenden."
                }
            }, {
                ninth: {
                    header: "Wohlfühlen pur",
                    text: "Neben meinem Streben nach Exzellenz in der Arbeit als Friseur bin ich bestrebt, Ihnen ein angenehmes und entspanntes Erlebnis zu bieten. Ich schaffe eine warme und einladende Atmosphäre, in der Sie sich wohlfühlen und den Alltagsstress hinter sich lassen können.Mein Ziel ist es, dass Sie sich bei mir wohl und gut aufgehoben fühlen, während ich mich mit Hingabe um Ihre Haare Kümmere."
                }
            }, {
                tenth: {
                    header: "Alles nur Kopfsache",
                    text: "Vereinbaren Sie noch heute einen Termin und lassen Sie uns gemeinsam das Beste aus Ihrem Haar herausholen. Mit Simon Speier und mir haben Sie Friseure an Ihrer Seite, die mit Liebe zum Detail Ihre Erwartungen übertreffen werden."
                }
            }]



    return (<>
        <div className="fixed bottom-0 left-0 w-full h-auto z-30 ">
            <div className="max-w-[600px] mx-auto backdrop-blur-lg">
                <div className="w-full h-20 p-5 flex relative top-0 left-0">
                    <Carousel input={names} />
                </div>
                <div className="relative w-full h-2">
                    <motion.div ref={progress} className="absolute left-0 h-full bg-[#333] w-full z-[-1] origin-left" style={{ scaleX }}></motion.div>
                    <motion.svg className="z-10 absolute bottom-0 left-0 h-full w-full" style={{ x }}>
                        <line x1="0" y1="0" x2="100%" y2="0" style={{ stroke: "#111", strokeWidth: 16, strokeDasharray: 2, strokeDashoffset: 1 }} />
                    </motion.svg>
                </div>
            </div>
        </div>
        <div
            ref={ref}
            onScroll={(e: any) => {
                scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
                progress.current.style.width = scaleX
                // list.current.style.left = scroll.current.toFixed(2) * 100 + "%"
            }}
            className="mainScroll scroll scrollbar-hide">
            {names.map((item: any, index: number) =>
            (<motion.div key={`${Object.keys(item)}`} id={`${Object.keys(item)}`} onViewportEnter={() => setSection(`${Object.values(item).map((item: any) => Object.values(item)[0])}`)}><SDiv props={{
                height: "200vh",
                children: (
                    <>
                        <h1>{`${Object.values(item).map((item: any) => Object.values(item)[0])}`}</h1>
                        <p className="mr-auto my-4 backdrop-blur-lg p-4 md:backdrop-blur-none md:p-0">{`${Object.values(item).map((item: any) => Object.values(item)[1])}`}</p>
                    </>
                )
            }}
            />
            </motion.div>)
            )}
        </div>
    </>);
};





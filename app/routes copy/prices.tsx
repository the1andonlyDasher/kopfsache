import { motion } from "framer-motion";
import Service from "@components/service";

const variants: any = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { staggerChidlren: 0.2, when: "beforeChildren", delayChildren: 0.1 } },
    exit: { opacity: 0, transition: { staggerChidlren: 0.2, when: "afterChildren", staggerDirection: -1 } },
}


const Prices = () => {
    return (<>
        <motion.section className="flex-wrap" variants={variants}>
            <motion.div variants={variants} className="flex flex-wrap flex-col h-full gap-6">
                <motion.h2 variants={variants}>Unsere Preise</motion.h2>
                <motion.h3 variants={variants}>Herren</motion.h3>
                <Service props={{
                    title: "Herrenhaarschnitt",
                    description: "Haare waschen, schneiden und föhnen.",
                    cost: "30,00€",
                    duration: "45 min",

                }} />
                <Service props={{
                    title: "Maschinenhaarschnitt",
                    description: "Hier wird nur mit der Maschine geschnitten, ohne Schere und die Haare werden gewaschen.",
                    cost: "16,00€",
                    duration: "15 min",


                }} />
                <Service props={{
                    title: "Kinderhaarschnitt bis 12 Jahre",
                    description: "Haare waschen, schneiden und föhnen.",
                    cost: "20,00€",
                    duration: "30 min",


                }} />
                <Service props={{
                    title: "Bart fromen",
                    description: "Hier wird der Bart sauber gemacht, gekürzt und in die gewünschte Form gebracht.",
                    cost: "6,50€",
                    duration: "15 min",

                }} />
                <Service props={{
                    title: "Bart Rasur (inkl. warme Kompresse)",
                    description: "Der Bart wird mit einem warmen Handtuch vorbereitet und anschließend mit dem Rasiermesser rasiert.",
                    cost: "12,00€",
                    duration: "30 min",

                }} />
                <Service props={{
                    title: "Kopfmassage",
                    description: "Kopfmassage mit einem wohltuendem Haarwasser.",
                    cost: "4,50€",
                    duration: "15 min",

                }} />
                <Service props={{
                    title: "Gesichtsreinigung und Massage",
                    description: "Mit einem tiefenreinigendem Peeling wird das Gesicht während der Massage gereinigt.",
                    cost: "9,50€",
                    duration: "30 min",

                }} />
                <Service props={{
                    title: "Verwöhnprogramm",
                    description: "Gönn dir auch mal was nach der harten Arbeit, lass dich komplett fallen und genieße es einfach.( Haarschnitt, Bart, Massage, Gesichtsreinigung, Haarentf.)",
                    cost: "58,00€",
                    duration: "105 min",

                }} />
                <Service props={{
                    title: "Haarfarbe oder Tönung (Herren)",
                    description: "Haarfarbe, Tönung oder nur Graukaschierung inklusive Waschen.",
                    cost: "25,00€",
                    duration: "45 min",

                }} />
                <Service props={{
                    title: "Maschienenhaarschnitt mit Übergang(null mm)",
                    description: "Hier werden nur die Seiten geschnitten ganz kurz von 0mm angefangen mit Übergang nach oben länger werdend.",
                    cost: "22,00€",
                    duration: "30 min",

                }} />
                <Service props={{
                    title: "Nasenwax/Ohren",
                    description: "Nasen oder Ohrenhaare mit Wax entfernen.",
                    cost: "3,50€",
                    duration: "15 min",

                }} />
            </motion.div>
            <motion.div variants={variants} className="flex flex-wrap flex-col h-full gap-6">
                <motion.h3>Damen</motion.h3>
                <Service props={{
                    title: "Damenhaarschnitt (kurz)",
                    description: "Waschen, Schneiden und Haare trocknen.",
                    cost: "30,00€",
                    duration: "45 min",

                }} />
                <Service props={{
                    title: "Damenhaarschnitt (lang)",
                    description: "Waschen, Schneiden und Haare trocknen.",
                    cost: "34,00€",
                    duration: "45 min",

                }} />
                <Service props={{
                    title: "Waschen, Schneiden und Föhnen (kurze Haare)",
                    description: "Haare waschen, schneiden und föhnen.",
                    cost: "51,00€",
                    duration: "75 min",

                }} />
                <Service props={{
                    title: "Waschen, Schneiden und Föhnen (lange Haare)",
                    description: "Haare waschen, schneiden und föhnen.",
                    cost: "61,00€",
                    duration: "90 min",

                }} />
                <Service props={{
                    title: "Kinderhaarschnitt bis 12 Jahre",
                    description: "Haare waschen, schneiden und föhnen.",
                    cost: "20,00€",
                    duration: "30 min",

                }} />
                <Service props={{
                    title: "Waschen, Föhnen und Styling (kurze Haare)",
                    description: "Haare waschen und föhnen inkl. Stylingprodukte",
                    cost: "22,50€",
                    duration: "30 min",

                }} />
                <Service props={{
                    title: "Waschen, Föhnen und Styling (lange Haare)",
                    description: "Haare waschen und föhnen inkl. Stylingprodukte",
                    cost: "30,00€",
                    duration: "45 min",

                }} />
                <Service props={{
                    title: "Haarfarbe (kurze haare)",
                    description: "Haare färben",
                    cost: "38,00€",
                    duration: "60 min",

                }} />
                <Service props={{
                    title: "Haarfarbe (ab Schulterlänge)",
                    description: "Haare färben",
                    cost: "48,00€",
                    duration: "90 min",

                }} />
                <Service props={{
                    title: "Strähnen Oberkopf (kurze Haare)",
                    description: "Strähnen der Haare am Oberkopf",
                    cost: "35,00€",
                    duration: "90 min",

                }} />
                <Service props={{
                    title: "Strähnen Oberkopf (lange Haare)",
                    description: "Strähnen der Haare am Oberkopf",
                    cost: "45,00€",
                    duration: "120 min",

                }} />
                <Service props={{
                    title: "Strähnen komplett",
                    description: "Strähnen der gesamten Haarlänge",
                    cost: "70,00€",
                    duration: "2-3 Stunden",

                }} />
                <Service props={{
                    title: "Blondieren",
                    description: "Blondieren",
                    cost: "48,00€",
                    duration: "150 min",

                }} />
                <Service props={{
                    title: "Balayage - reine Aufhellung",
                    description: "je nach Haarlänge und Menge",
                    cost: "70,00€",
                    duration: "4-5 Stunden",

                }} />
                <Service props={{
                    title: "Dauerwelle (kurze Haare)",
                    description: "Dauerwelle",
                    cost: "42,00€",
                    duration: "90 min",

                }} />
                <Service props={{
                    title: "Dauerwelle (lange Haare)",
                    description: "Dauerwelle",
                    cost: "52,00€",
                    duration: "120 min",

                }} />
                <Service props={{
                    title: "Intensivpflege",
                    description: "Dauerwelle",
                    cost: "52,00€",
                    duration: "variiert nach Haarlänge",

                }} />
                <Service props={{
                    title: "Ponyhaarschnitt",
                    description: "Pony schneiden",
                    cost: "6,50€",
                    duration: "schnell",

                }} />
                <Service props={{
                    title: "Abmattieren, Glossing",
                    description: "Veredelung der Haarfarbe",
                    cost: "25,00€",
                    duration: "variiert",

                }} />
                <Service props={{
                    title: "Farbsträhne pro Folie",
                    description: "Veredelung der Haarfarbe",
                    cost: "2,50€",
                    duration: "variiert",

                }} />
                <Service props={{
                    title: "Zusatzfarbe",
                    description: "Veredelung der Haarfarbe",
                    cost: "15,00€",
                    duration: "variiert",

                }} />
                <Service props={{
                    title: "Haar Botox Behandlung (kurze Haare)",
                    description: "Teifenpflege bei trockenem, geschädigtem Haar",
                    cost: "129,00€",
                    duration: "60 min",

                }} />
                <Service props={{
                    title: "Haar Botox Behandlung (lange Haare)",
                    description: "Teifenpflege bei trockenem, geschädigtem Haar",
                    cost: "159,00€",
                    duration: "90 min",

                }} />
            </motion.div>
        </motion.section>
    </>);
};


export default Prices;


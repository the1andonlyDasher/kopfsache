import { motion, useAnimation } from 'framer-motion';
import Service from '../components copy/service';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { productViewer } from '~/components copy/atoms';

const variants: any = {
    initial: { opacity: 0 },
    enter: {
        opacity: 1,
        transition: {
            staggerChidlren: 0.2,
            when: 'beforeChildren',
            delayChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChidlren: 0.2,
            when: 'afterChildren',
            staggerDirection: -1,
        },
    },
};

const Prices = () => {
    const [pvAtom, setPVAtom] = useAtom(productViewer);
    const lists = {
        Herren: '',
        Damen: '',
        keine: '',
    };
    const [listView, setListView] = useState('keine');
    const [clicked, setClicked] = useState(false);
    const lpViewer = useRef<any>(!null);
    const setCoords = () => {
        const { width, height, left, top } =
            lpViewer?.current.getBoundingClientRect();
        setPVAtom({ width, height, left, top });
        console.log('setting coords');
    };

    useEffect(() => {
        console.log(listView);
    }, [listView]);

    useEffect(() => {
        setCoords();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', setCoords);

        return () => {
            window.removeEventListener('scroll', setCoords);
        };
    });

    useEffect(() => {
        window.addEventListener('resize', setCoords);

        return () => {
            window.removeEventListener('resize', setCoords);
        };
    });

    const controls = useAnimation();
    const servVariants = {
        inital: { display: 'none', opacity: 0 },
        enter: { display: 'flex', opacity: 1, transition: { delay: 0.5 } },
        exit: { display: 'none', opacity: 0 },
    };
    return (
        <>
            <section className="py-4">
                <div className="w-full flex flex-col justify-start">
                    <h2 className="w-full text-center md:text-left">Unsere Preise</h2>
                    <motion.h3
                        className="w-full text-center md:text-left"
                        initial={{ display: 'none', opacity: 0 }}
                        animate={
                            listView === 'keine'
                                ? {
                                    display: 'none',
                                    opacity: 0,
                                    transition: { display: { delay: 0.5 } },
                                }
                                : {
                                    display: 'flex',
                                    opacity: 1,
                                }
                        }
                    >
                        {listView !== 'keine' && listView}
                    </motion.h3>
                </div>
                <motion.div initial={{ opacity: 1 }} animate={controls}>
                    <motion.button
                        initial={{ display: 'none', opacity: 0 }}
                        animate={
                            listView === 'keine'
                                ? {
                                    display: 'none',
                                    opacity: 0,
                                    transition: { display: { delay: 0.5 } },
                                }
                                : {
                                    display: 'flex',
                                    opacity: 1,
                                }
                        }
                        onClick={(e) => {
                            setListView('keine');
                            setClicked(!clicked);
                            setTimeout(() => {
                                setCoords();
                            }, 600);
                        }}
                        className="my-[20px] mb-0 bg-indigo-500 text-white px-6 py-2 rounded-md max-w-[200px] md:py-4 md:px-10 hover:bg-black"
                    >
                        Zurück
                    </motion.button>
                </motion.div>
                <motion.div
                    className={`flex ${listView === 'Herren'
                        ? 'flex-col-reverse md:flex-row-reverse'
                        : listView === 'Damen'
                            ? 'flex-col md:flex-row'
                            : 'flex-col md:flex-row'
                        } w-full h-full flex-1  justify-center items-center`}
                    variants={variants}
                >
                    <motion.div
                        initial={{ opacity: 1, display: 'flex' }}
                        animate={
                            listView === 'Herren'
                                ? {
                                    opacity: 1,
                                    display: 'flex',
                                    transition: {
                                        opacity: { delay: 0.5 },
                                        display: {},
                                    },
                                }
                                : listView === 'keine'
                                    ? {
                                        opacity: 1,
                                        display: 'flex',
                                        transition: {
                                            opacity: { delay: 0.5 },
                                            display: {},
                                        },
                                    }
                                    : {
                                        opacity: 0,
                                        display: 'none',
                                        transition: {
                                            opacity: { duration: 0.5 },
                                            display: { delay: 0.5 },
                                        },
                                    }
                        }
                        className="flex flex-[1_0_200px] w-full h-full max-h-[50vh] justify-center 
                        overflow-y-auto relative scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-slate-600"
                    >
                        <motion.div
                            transition={{ type: 'spring', damping: 10, stiffness: 50 }}
                            variants={servVariants}
                            initial={'initial'}
                            animate={listView === 'Herren' ? 'enter' : 'exit'}
                            className="flex-col h-full top-0"
                        >
                            <Service
                                props={{
                                    title: 'Herrenhaarschnitt',
                                    description: 'Haare waschen, schneiden und föhnen.',
                                    cost: '30,00€',
                                    duration: '45 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Maschinenhaarschnitt',
                                    description:
                                        'Hier wird nur mit der Maschine geschnitten, ohne Schere und die Haare werden gewaschen.',
                                    cost: '16,00€',
                                    duration: '15 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Kinderhaarschnitt bis 12 Jahre',
                                    description: 'Haare waschen, schneiden und föhnen.',
                                    cost: '20,00€',
                                    duration: '30 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Bart fromen',
                                    description:
                                        'Hier wird der Bart sauber gemacht, gekürzt und in die gewünschte Form gebracht.',
                                    cost: '6,50€',
                                    duration: '15 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Bart Rasur (inkl. warme Kompresse)',
                                    description:
                                        'Der Bart wird mit einem warmen Handtuch vorbereitet und anschließend mit dem Rasiermesser rasiert.',
                                    cost: '12,00€',
                                    duration: '30 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Kopfmassage',
                                    description: 'Kopfmassage mit einem wohltuendem Haarwasser.',
                                    cost: '4,50€',
                                    duration: '15 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Gesichtsreinigung und Massage',
                                    description:
                                        'Mit einem tiefenreinigendem Peeling wird das Gesicht während der Massage gereinigt.',
                                    cost: '9,50€',
                                    duration: '30 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Verwöhnprogramm',
                                    description:
                                        'Gönn dir auch mal was nach der harten Arbeit, lass dich komplett fallen und genieße es einfach.( Haarschnitt, Bart, Massage, Gesichtsreinigung, Haarentf.)',
                                    cost: '58,00€',
                                    duration: '105 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Haarfarbe oder Tönung (Herren)',
                                    description:
                                        'Haarfarbe, Tönung oder nur Graukaschierung inklusive Waschen.',
                                    cost: '25,00€',
                                    duration: '45 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Maschienenhaarschnitt mit Übergang(null mm)',
                                    description:
                                        'Hier werden nur die Seiten geschnitten ganz kurz von 0mm angefangen mit Übergang nach oben länger werdend.',
                                    cost: '22,00€',
                                    duration: '30 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Nasenwax/Ohren',
                                    description: 'Nasen oder Ohrenhaare mit Wax entfernen.',
                                    cost: '3,50€',
                                    duration: '15 min',
                                }}
                            />
                        </motion.div>
                        <motion.button
                            animate={
                                clicked
                                    ? {
                                        opacity: 0,
                                        display: 'none',
                                        transition: {
                                            opacity: { duration: 0.5 },
                                            display: { delay: 0.5 },
                                        },
                                    }
                                    : {
                                        opacity: 1,
                                        display: 'flex',
                                        transition: {
                                            opacity: { delay: 0.5 },
                                            display: {},
                                        },
                                    }
                            }
                            onClick={() => {
                                setListView('Herren');
                                setClicked(!clicked);
                                setTimeout(() => {
                                    setCoords();
                                }, 600);
                            }}
                            className="my-auto mb-0 bg-indigo-500 text-white px-6 py-2 rounded-md max-w-[200px] md:py-4 md:px-10 hover:bg-black"
                        >
                            Herren
                        </motion.button>
                    </motion.div>
                    <motion.div
                        ref={lpViewer}
                        className="flex flex-[1_0_200px] min-h-[33%] w-full h-full justify-center items-center"
                    ></motion.div>
                    <motion.div
                        initial={{ opacity: 1, display: 'flex' }}
                        animate={
                            listView === 'Damen'
                                ? {
                                    opacity: 1,
                                    display: 'flex',
                                    transition: {
                                        opacity: { delay: 0.5 },
                                    },
                                }
                                : listView === 'keine'
                                    ? {
                                        opacity: 1,
                                        display: 'flex',
                                        transition: {
                                            opacity: { delay: 0.5 },
                                        },
                                    }
                                    : {
                                        opacity: 0,
                                        display: 'none',
                                        transition: {
                                            opacity: { duration: 0.5 },
                                            display: { delay: 0.5 },
                                        },
                                    }
                        }
                        className="flex flex-[1_0_200px] w-full h-full max-h-[50vh] justify-center
                        overflow-y-auto scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-slate-600"
                    >
                        <motion.div
                            transition={{ type: 'spring', damping: 10, stiffness: 50 }}
                            variants={servVariants}
                            initial={'initial'}
                            animate={listView === 'Damen' ? 'enter' : 'exit'}
                            className="flex-col h-full"
                        >
                            <Service
                                props={{
                                    title: 'Damenhaarschnitt (kurz)',
                                    description: 'Waschen, Schneiden und Haare trocknen.',
                                    cost: '30,00€',
                                    duration: '45 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Damenhaarschnitt (lang)',
                                    description: 'Waschen, Schneiden und Haare trocknen.',
                                    cost: '34,00€',
                                    duration: '45 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Waschen, Schneiden und Föhnen (kurze Haare)',
                                    description: 'Haare waschen, schneiden und föhnen.',
                                    cost: '51,00€',
                                    duration: '75 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Waschen, Schneiden und Föhnen (lange Haare)',
                                    description: 'Haare waschen, schneiden und föhnen.',
                                    cost: '61,00€',
                                    duration: '90 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Kinderhaarschnitt bis 12 Jahre',
                                    description: 'Haare waschen, schneiden und föhnen.',
                                    cost: '20,00€',
                                    duration: '30 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Waschen, Föhnen und Styling (kurze Haare)',
                                    description: 'Haare waschen und föhnen inkl. Stylingprodukte',
                                    cost: '22,50€',
                                    duration: '30 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Waschen, Föhnen und Styling (lange Haare)',
                                    description: 'Haare waschen und föhnen inkl. Stylingprodukte',
                                    cost: '30,00€',
                                    duration: '45 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Haarfarbe (kurze haare)',
                                    description: 'Haare färben',
                                    cost: '38,00€',
                                    duration: '60 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Haarfarbe (ab Schulterlänge)',
                                    description: 'Haare färben',
                                    cost: '48,00€',
                                    duration: '90 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Strähnen Oberkopf (kurze Haare)',
                                    description: 'Strähnen der Haare am Oberkopf',
                                    cost: '35,00€',
                                    duration: '90 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Strähnen Oberkopf (lange Haare)',
                                    description: 'Strähnen der Haare am Oberkopf',
                                    cost: '45,00€',
                                    duration: '120 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Strähnen komplett',
                                    description: 'Strähnen der gesamten Haarlänge',
                                    cost: '70,00€',
                                    duration: '2-3 Stunden',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Blondieren',
                                    description: 'Blondieren',
                                    cost: '48,00€',
                                    duration: '150 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Balayage - reine Aufhellung',
                                    description: 'je nach Haarlänge und Menge',
                                    cost: '70,00€',
                                    duration: '4-5 Stunden',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Dauerwelle (kurze Haare)',
                                    description: 'Dauerwelle',
                                    cost: '42,00€',
                                    duration: '90 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Dauerwelle (lange Haare)',
                                    description: 'Dauerwelle',
                                    cost: '52,00€',
                                    duration: '120 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Intensivpflege',
                                    description: 'Dauerwelle',
                                    cost: '52,00€',
                                    duration: 'variiert nach Haarlänge',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Ponyhaarschnitt',
                                    description: 'Pony schneiden',
                                    cost: '6,50€',
                                    duration: 'schnell',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Abmattieren, Glossing',
                                    description: 'Veredelung der Haarfarbe',
                                    cost: '25,00€',
                                    duration: 'variiert',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Farbsträhne pro Folie',
                                    description: 'Veredelung der Haarfarbe',
                                    cost: '2,50€',
                                    duration: 'variiert',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Zusatzfarbe',
                                    description: 'Veredelung der Haarfarbe',
                                    cost: '15,00€',
                                    duration: 'variiert',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Haar Botox Behandlung (kurze Haare)',
                                    description: 'Teifenpflege bei trockenem, geschädigtem Haar',
                                    cost: '129,00€',
                                    duration: '60 min',
                                }}
                            />
                            <Service
                                props={{
                                    title: 'Haar Botox Behandlung (lange Haare)',
                                    description: 'Teifenpflege bei trockenem, geschädigtem Haar',
                                    cost: '159,00€',
                                    duration: '90 min',
                                }}
                            />
                        </motion.div>
                        <motion.button
                            animate={
                                clicked
                                    ? {
                                        opacity: 0,
                                        display: 'none',
                                        transition: {
                                            opacity: { duration: 0.5 },
                                            display: { delay: 0.5 },
                                        },
                                    }
                                    : {
                                        opacity: 1,
                                        display: 'flex',
                                        transition: {
                                            opacity: { delay: 0.5 },
                                            display: {},
                                        },
                                    }
                            }
                            onClick={(e) => {
                                setListView('Damen');
                                setClicked(!clicked);
                                setTimeout(() => {
                                    setCoords();
                                }, 600);
                            }}
                            className="my-auto mb-0 bg-indigo-500 text-white px-6 py-2 rounded-md max-w-[200px] md:py-4 md:px-10 hover:bg-black"
                        >
                            Damen
                        </motion.button>
                    </motion.div>
                    {/* <motion.div variants={variants} className="flex flex-wrap flex-col h-full gap-6">
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
            </motion.div> */}
                </motion.div>
            </section>
        </>
    );
};

export default Prices;

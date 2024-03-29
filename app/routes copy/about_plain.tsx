
import { Carousel } from "@components/Carousel";
import { SDiv } from "@components/ScrollDiv";
import { globalScroll } from "@components/atoms";
import { motion, useScroll, useSpring } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { InView } from 'react-intersection-observer';
import { currentSection } from "@components/atoms";
import Footer from "@components/Footer";

const About = () => {





    
  

  return (<>
<section>
  <h2 className="py-4">Hi, Ich bin Stephan!</h2>
  <div className="flex justify-start w-full py-6 pl-8 border-l border-[#222]">
  <p>Seit 2009 übe ich mit Hingabe und Begeisterung den Beruf des Friseurs aus und führe seit 2018 meinen eigenen Salon. Meine Leidenschaft für dieses Handwerk ist nicht nur eine Karriere, sondern eine Lebensweise, die es mir ermöglicht, Menschen glücklich zu machen und ihnen ein strahlendes Lächeln ins Gesicht zu zaubern
Bei mir steht der Kunde im Mittelpunkt. Mein oberstes Ziel ist es, Ihre individuellen Wünsche und Bedürfnisse zu verstehen und diese in einzigartige Frisuren umzusetzen, die Ihre Persönlichkeit unterstreichen. Egal, ob Sie eine klassische oder moderne Frisur bevorzugen, ob Sie eine Veränderung wünschen oder einfach nur verwöhnt werden möchten, ich stehe Ihnen mit Rat und Tat zur Seite.
Mein Team und ich legen großen Wert auf Qualität und Innovation.
</p>
</div>
<div className="flex justify-start w-full py-6 pl-8 border-l border-[#222]">
<p>Wir bleiben stets auf dem neuesten Stand der Trends und Techniken, um Ihnen die bestmöglichen Ergebnisse zu liefern. Wir verwenden hochwertige Produkte, die Ihrem Haar die Pflege und Aufmerksamkeit schenken, die es verdient. Ihre Zufriedenheit steht für uns an erster Stelle.
Neben erstklassigen Haarschnitten bieten wir auch eine Vielzahl weiterer Services an.
Unsere Leistungen umfassen unter anderem professionelles Styling für besondere Anlässe, Farbveränderungen, Haarverlängerungen und -verdichtungen sowie entspannende Kopf- und Haarpflegebehandlungen. In unserem Salon können Sie sich verwöhnen lassen und eine Auszeit vom Alltag genießen.
</p>
</div>
<div className="flex justify-start w-full py-6 pl-8 border-l border-[#222]">
<p>Bei uns erwartet Sie nicht nur ein Friseurbesuch, sondern ein einzigartiges Erlebnis. Unsere angenehme und entspannte Atmosphäre lässt Sie den Stress des Tages vergessen und sich vollkommen fallen lassen. Wir legen großen Wert auf eine persönliche und individuelle Betreuung, um sicherzustellen, dass Sie sich bei uns rundum wohl fühlen.
Kundenfeedback ist uns besonders wichtig. Wir freuen uns über jede Rückmeldung. denn sie hilft uns, uns kontinuierlich zu verbessern und unsere Dienstleistungen an Ihre Bedürfnisse anzupassen. Ihr Vertrauen ist für uns die größte Motivation, unsere
Leidenschaft für den Friseurberuf Tag für Tag zu leben.
Besuchen Sie uns in unserem Salon und lassen Sie sich von unserer Leidenschaft für das Friseurhandwerk überzeugen. Wir freuen uns darauf, Ihnen zu einem neuen Look zu verhelfen und Ihnen ein Lächeln ins Gesicht zu zaubern. Vereinbaren Sie noch heute einen Termin und erleben Sie den Unterschied bei Stephan Müller - Ihrem Friseurmeister aus Leidenschaft!</p>
</div>
</section>
<section>
  <h2 className="py-4">Hi, Ich bin Simon!</h2>
<div className="flex justify-start w-full py-6 pl-8 border-l border-[#222]">
  <p>Seit 2020 bin ich stolz darauf, Teil dieses wunderbaren Salons zu sein und meiner Leidenschaft für das Friseurhandwerk nachzugehen. Die Arbeit als Friseur erfüllt mich mit Freude und Begeisterung, und ich strebe danach, das Beste aus jedem meiner Kunden herauszuholen. Mein Ziel ist es, Ihnen ein außergewöhnliches Erlebnis zu bieten und Ihnen mit meiner Expertise zu einem unverwechselbaren Look zu verhelfen
Für mich ist es von großer Bedeutung, mich stetig weiterzubilden und mit den neuesten Trends und Techniken vertraut zu sein. Die Friseurbranche ist dynamisch und entwickelt sich kontinuierlich weiter. Daher investiere ich viel Zeit und Energie in meine Weiterbildung, um sicherzustellen, dass ich Ihnen immer die aktuellsten und innovativsten Lösungen bieten kann. Durch regelmäßige Schulungen und Workshops halte ich mich über die neuesten Schnitt- und Stylingtechniken auf dem Laufenden.
Neben meinem Streben nach Exzellenz in der Arbeit als Friseur bin ich bestrebt, Ihnen ein angenehmes und entspanntes Erlebnis zu bieten. 
Ich schaffe eine warme und einladende Atmosphäre, in der Sie sich wohlfühlen und den Alltagsstress hinter sich lassen können. Mein Ziel ist es, dass Sie sich bei mir wohl und gut aufgehoben fühlen, während ich mich mit Hingabe um Ihre Haare kümmere.
</p></div>
<div className="flex justify-start w-full py-6 pl-8 border-l border-[#222]">
  <p>
Ich freue mich darauf, sie im Salon begrüßen zu dürfen und Ihnen mit meiner
Leidenschaft für das Friseurhandwerk ein strahlendes Lächeln ins Gesicht zu zaubern.
Vereinbaren Sie noch heute einen Termin und lassen Sie uns gemeinsam das Beste aus Ihrem Haar herausholen. Mit Simon Speier haben Sie einen Friseur an Ihrer Seite, der mit Liebe zum Detail Ihre Erwartungen übertreffen wird,</p>
</div>
</section>
  </>);
};


export default About;


import { Link, useLoaderData } from '@remix-run/react';
import { LoaderArgs } from '@shopify/remix-oxygen';
import { useIsPresent } from "framer-motion"
import { useEffect, useRef, useState } from 'react';
import { model } from '@components/atoms';
import { useAtom } from 'jotai';
import products from "../../public/images/kopf_comp.webp"
import simon from "../../public/images/simon.webp"
import stephan from "../../public/images/stephan.webp"
import DoubleSec from '@components/DoubleSection';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope, faPhoneSquare } from '@fortawesome/free-solid-svg-icons';
import Footer from '@components/Footer';
import Tiles from '@components/hero/Tiles';
import { icons } from '@components/hero/icons';
import { simonBilder, stephanBilder } from '@components/images/images';
import { COLLECTIONS_QUERY } from '@queries/models';


export async function loader({ context }: LoaderArgs) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function Index() {
  const ref = useRef<any>(!null);
  const [simonClicked, setSimonClicked] = useState(false)
  const [stephanClicked, setStephanClicked] = useState(false)
  const { collections }: any = useLoaderData() || {}
  const [stableData, setData] = useState(collections);
  const [m, setM] = useAtom(model)
  const isPresent = useIsPresent();
  const video = useRef<any>(!null)

  useEffect(() => {
    video.current.muted = true;
    video.current.play();
    // console.log(stableData)
    collections && setData(collections)
  }, [collections])

  return (<>
    <section>
      <div className='flex flex-row justify-center w-full h-full flex-1'>
        <div className='flex flex-col flex-1'>

        </div>
        <div className='flex flex-col flex-1'></div>
      </div>
    </section>
    <DoubleSec props={{
      left: true,
      sectionClass: "relative border-[#222] border-l ",
      sectionName: "first",
      children: (<>
        <div className='flex flex-col relative h-full w-full m-auto justify-center align-center md:max-h-[375px] '>
          <div className='mb-auto mx-4 img__wrapper py-2'>
            <h4>Denk immer daran</h4>
            <h1>Es ist alles nur Kopfsache</h1>
          </div>
          <div className="flex justify-center align-center flex-col h-full sec-pad_right gap-5 mx-4">
            <video ref={video} preload='none' autoPlay loop muted playsInline className='max-h-[600px] max-w-[300px] sm:max-w-none'>
              <source src="/images/vid.mov" type='video/mp4'></source>
              <source src="/images/vid.webm" type='video/webm'></source>
              <track kind="captions" ></track>
            </video>
            {/* <img className="self-end my-0 mx-auto z-[2] w-[90%]" src={img} alt="Stephan und Simon" style={{ transformOrigin: "bottom right", maxWidth: "500px" }} /> */}
          </div>
          <div className='mb-auto mx-4 img__wrapper'>
            <p className='my-5'>Tauche ein in die Welt von Kopfsache by Stephan und lass Dich verwöhnen!</p>
            <Link to="https://www.studiobookr.com/kopfsache-by-stephan-mueller-56870#/"><button className="btn__primary" type="button">Termin buchen</button></Link>
          </div>
        </div>
      </>),
      deskChildren: (<>
        <div className="flex hero-grid_right justify-center align-center flex-col sec-pad_left">
          <div className='flex gap-5 flex-col px-10 py-5 justify-center align-center'>
            <div className=''>
              <h4>Denk immer daran</h4>
              <h1>Es ist alles nur Kopfsache</h1>
              <p>Tauche ein in die Welt von Kopfsache by Stephan und lass Dich verwöhnen!</p>
              <Link to="https://www.studiobookr.com/kopfsache-by-stephan-mueller-56870#/"><button className="btn__primary" type="button">Termin buchen</button></Link>

            </div>
          </div>
        </div>
      </>
      )
    }} />
    <DoubleSec props={{
      left: true,
      sectionClass: "relative ",
      sectionName: "second",
      children: (<>
        <div className='hidden grid-cols-1  relative  relative h-full w-full m-auto max-h-[70%] justify-center align-center z-10 md:grid'>
          <div className='flex justify-center align-center flex-col p-5'>
            <Tiles bgPosition="bg-center" gridClass="feature-grid" array={icons} />
          </div>
        </div>
        <div className='hidden justify-start align-center absolute top-0 left-[50%] w-full h-full z-[1] overflow-hidden md:flex'>
          <div className='bg-grid_section2 flex flex-wrap w-full my-auto grid-cols-5 grid-rows-[repeat(2,_minmax(2rem,_1fr))] justify-start align-start'>
            <h2 className='text-left'>Schneiden</h2>
            <h2 className='text-left'>Waschen</h2>
            <h2 className='text-left'>Fohnen</h2>
            <h2 className='text-left'>Färben</h2>
            <h2 className='text-left'>Stylen</h2>
            <h2 className='text-left'>Föhnen</h2>
            <h2 className='text-left'>Waxen</h2>
            <h2 className='text-left'>Massieren</h2>
            <h2 className='text-left'>Tönen</h2>
          </div>
        </div>

      </>),
      deskChildren: (<>
        <div className="flex justify-center h-full align-center flex-col bg-[#0f0f0f00] p-0 realative md:bg-[#0f0f0f] md:sec-pad_left md:sec-pad_right">
          <div className='flex gap-5 flex-col'>
            <div className='my-4 md:px-8'>
              <h5 className='text-[var(--clr-contrast-400)]'>Unsere Philosophie:</h5>
              <h1 className=''>Bei uns sind Alle herzlich willkommen...</h1>
              <p>... wir freuen uns über deinen Besuch!</p>
            </div>
            <Tiles bgPosition="bg-center" addClass="img__wrapper" gridClass="feature-grid" array={icons} />
            <div className='my-4 md:px-8'>
              <h4 className='my-2'>Ein umfangreiches Angebot...</h4>
              <p>...erwartet dich bei uns! Was auch immer Dir vorschwebt, zusammen werden wir deine Vorstellung Realität werden lassen.</p>
              <button className='btn__outline' role='button' type="button"><a href='https://www.instagram.com/kopfsache.by.stephan/'>Mehr von uns</a></button>
            </div>
          </div>
          <div className='img__wrapper flex justify-center align-center absolute top-0 left-0 w-full h-full z-[-1] overflow-hidden'>
            <div className='bg-grid_section2 flex flex-wrap w-full my-auto grid-cols-5 grid-rows-[repeat(2,_minmax(2rem,_1fr))] justify-center align-center'>
              <h2>Schneiden</h2>
              <h2>Waschen</h2>
              <h2>Fohnen</h2>
              <h2>Färben</h2>
              <h2>Stylen</h2>
              <h2>Föhnen</h2>
              <h2>Waxen</h2>
              <h2>Massieren</h2>
              <h2>Tönen</h2>
            </div>
          </div>

        </div>
      </>
      )
    }} />
    <DoubleSec props={{
      left: false,
      sectionClass: "relative ",
      sectionName: "third",
      ref: ref,
      children: (<>
        <div className='grid grid-cols-1  relative h-full w-full m-auto  justify-center align-center py-20'>
          <div className="flex justify-center align-center flex-col h-full">
            <div className='hidden h-full justify-center align-center flex-col pr-10 md:flex  border-b border-[#222]'>
              <div className=''>
                <h2 className='my-2'>Hi, ich bin Stephan</h2>
                <p className='my-2'>Friseurmeister seit 2009. Ich freue mich darauf Dir zu Deinem neuen Look zu verhelfen.</p>
              </div>
              <div className='my-4'>
                <h4 className='my-2'>Erfahre mehr über mich <a href="/about" className='underline' aria-label='link'>hier!</a></h4>
              </div>
            </div>
            <div className='flex  justify-center align-center flex-col pr-10 img__wrapper'>
              <div className=''>
                <h2 className='my-2'>Hi, wir sind Stephan und Simon</h2>
                <p className='my-2'>Gemeinsam werden wir dich verwandeln und freuen uns darauf Dir zu Deinem neuen Look zu verhelfen.</p>
              </div>
            </div>
            <div className='flex flex-no
                wrap flex-row w-full gap-5 my-12 img__wrapper'>
              <div className='flex flex-nowrap w-auto flex-[1_1_50%] h-full justify-start img__wrapper'>
                {/* <Tiles gridClass="about-grid about-grid-left" array={stephanBilder} perspective={false}/> */}
                <div className='rounded-br-lg w-full min-h-[200px]  h-[100%] flex-[1_1_100%] bg-cover bg-top' style={{ backgroundImage: `url(${stephan})` }}></div>
              </div>
              <div className='flex flex-nowrap w-auto flex-[1_1_50%] h-full justify-start img__wrapper'>
                {/* <Tiles gridClass="about-grid about-grid-right" array={simonBilder} perspective={false}/> */}
                <div className='rounded-br-lg w-full min-h-[200px] h-[100%] flex-[1_1_100%] bg-cover bg-top' style={{ backgroundImage: `url(${simon})` }}></div>
              </div>
            </div>
            <div className='hidden flex-nowrap w-full h-full justify-start md:flex'>
              <Tiles bgPosition="bg-top" gridClass="about-grid about-grid-right" array={simonBilder} perspective={false} />
              {/* <div className='rounded-tl-lg max-w-[100%] min-h-[200px] h-[100%] flex-[1_1_100%] bg-cover bg-top' style={{ backgroundImage: `url(${simon})` }}></div> */}
            </div>
            <div className='img__wrapper'>
              <h4>Erfahre mehr über uns <a href="/about" className='underline' aria-label='link'>hier!</a></h4>
              <p>Bleibe gerne mit uns in Verbindung:</p>
              <div className='socials flex justify-evenly my-5 w-full py-5'>
                <Link title="Facebook von Kopfsache by Stephan" aria-label='Facebook von Kopfsache by Stephan' to="https://www.facebook.com/people/Kopfsache-by-Stephan/100070527370504/" className="max-h-4"><FontAwesomeIcon icon={faFacebookF} /></Link>
                <Link title="Instagram von Kopfsache by Stephan" aria-label='Instagram von Kopfsache by Stephan' to="https://www.instagram.com/kopfsache.by.stephan/" className="max-h-4"><FontAwesomeIcon icon={faInstagram} /></Link>
                <Link title="Email-Adresse von Kopfsache by Stephan" aria-label='Email-Adresse von Kopfsache by Stephan' to="mailto:stephan.muller4@aol.de" className="max-h-4"><FontAwesomeIcon icon={faEnvelope} /></Link>
                <Link title="Telefonnummer von Kopfsache by Stephan" aria-label='Telefonnummer von Kopfsache by Stephan' to="tel:+49152 23024555" className="max-h-4"><FontAwesomeIcon icon={faPhoneSquare} /></Link>
              </div>
            </div>
          </div>
        </div>
      </>),
      deskChildren: (<>
        <div className="flex justify-center align-center flex-col border-l border-[#222] py-20">
          <div className='flex-auto flex'></div>
          <div className='flex relative h-full justify-center align-center flex-col'>

            <div className='flex-nowrap w-full h-full justify-start space-x-10 md:space-x-15 border-b border-[#222]'>
              <Tiles bgPosition="bg-top" gridClass="about-grid about-grid-left" array={stephanBilder} perspective={false} />
              {/* <div className='rounded-br-lg max-w-[100%] h-[100%] flex-[1_1_100%] bg-cover bg-top' style={{ backgroundImage: `url(${stephan})` }}></div> */}
            </div>
          </div>
          <div className='hidden h-full justify-center align-center flex-col px-10 md:flex'>
            <div className=''>
              <h2 className='my-2'>Hi, ich bin Simon!</h2>
              <p className='my-2'>Ich arbeite mit Stephan zusammen seit 2020.Gemeinsam werden wir dich verwandeln.</p>
              <h4 className='my-2'>Erfahre mehr über mich <a className='underline' href="/about" aria-label='link'>hier!</a></h4>
            </div>
          </div>
        </div>
      </>
      )
    }} />
    <DoubleSec props={{
      left: false,
      sectionClass: "relative ",
      sectionName: "fourth",
      header: "Hol dir deine Haarpflege direkt bei uns!",
      // background:(<>
      //     <div className='absolute top-0 left-0 w-full h-full bg-center' style={{backgroundImage:`url('${products}')`}}></div>
      // </>),
      children: (<>
        <div className='grid grid-cols-1  relative h-full w-full m-auto justify-center align-center md:max-h-[50%]'>
          <div className="flex justify-center align-center flex-col h-full gap-5">
            <div className='flex flex-col h-full  my-auto bg-center bg-cover min-h-[400px]' style={{ backgroundImage: `url('${products}')` }}></div>
            <div className='mb-auto img__wrapper '>
              <h2>Finde tolle Produkte</h2>
              <p>...die zu dir passen.</p>
            </div>
            {/* <img className="my-0 z-[2] w-full" src={products} alt="Stephan und Simon" style={{ scale: "1", transformOrigin: "bottom right", maxWidth:"500px" }} /> */}
            <div className='mt-auto img__wrapper '>
              {stableData.nodes.map((collection: any) => {
                return (
                  <Link className='btn__primary text-center' aria-label='link' to={`/collections/${collection.handle}`} key={collection.id}>
                    Zum Shop
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </>),
      deskChildren: (<>
        <div className="flex justify-center align-center flex-col border-l border-[#222]">

          <div className='flex gap-5 flex-col px-10 py-5 h-full max-h-[50%] my-auto bg-[#0f0f0f]'>
            <div className='m-auto'>
              <h2>Finde tolle Produkte</h2>
              <p>...die zu dir passen.</p>
              {stableData.nodes.map((collection: any) => {
                return (
                  <Link className='btn__primary text-center' aria-label='link' to={`/collections/${collection.handle}`} key={collection.id}>
                    Zum Shop
                  </Link>
                );
              })}
            </div>

          </div>
        </div>
      </>
      )
    }} />
    <Footer />
  </>
  );
}



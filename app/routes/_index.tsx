import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import type {
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faPhoneSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIsPresent } from 'framer-motion';
import { useAtom } from 'jotai';
import DoubleSec from '~/components copy/DoubleSection';
import Footer from '~/components copy/Footer';
import { model, productViewer } from '~/components copy/atoms';
import Tiles from '~/components copy/hero/Tiles';
import { icons } from '~/components copy/hero/icons';
import { simonBilder, stephanBilder } from '~/components copy/images/images';
import { stephan, simon } from '~/components copy/texts';
import products from "../../public/images/kopf_comp.webp"
import { COLLECTIONS_QUERY } from '~/queries/models';
import InstagramPost from '~/components copy/InstagramPost';
import { ImageCarousel } from '~/components copy/ImageCarousel';
import Head from '~/components copy/Head';
import { View } from '~/components copy/Canvas/View';
import { Bounds } from '@react-three/drei';


export const meta: MetaFunction = () => {
  return [{ title: 'Hydrogen | Home' }];
};

export async function loader({ context }: LoaderFunctionArgs) {

  return await context.storefront.query(COLLECTIONS_QUERY);
}


export default function Homepage() {
  const ref = useRef<any>(!null);
  const lpViewer = useRef<any>(!null);
  const { collections }: any = useLoaderData() || {}
  const [stableData, setData] = useState(collections);
  const [m, setM] = useAtom(model)
  const video = useRef<any>(!null)
  const [pvAtom, setPVAtom] = useAtom(productViewer)
  const setCoords = () => {
    const { width, height, left, top } = lpViewer?.current.getBoundingClientRect()
    setPVAtom({ width, height, left, top })
    console.log("setting coords")
  };

  useEffect(() => {
    setCoords()
  }, []);

  useEffect(() => {
    setCoords()
    // video.current.muted = true;
    // video.current.play();
    // console.log(stableData)
    collections && setData(collections)
  }, [collections])

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

  return (<>
    <section className=''>
      <div className='flex flex-row justify-center w-full h-full flex-1'>
        <div ref={lpViewer} className='flex flex-col flex-1'>

        </div>
        <div className='flex flex-col flex-1 py-6 justify-center items-center'>
          <div className="grid grid-cols-2 grid-rows-4 gap-4">
            <div
              className="row-span-1 bg-black rounded-md border border-[#222] p-6">
              <h3>Neue Frisur gefällig?</h3>
              <Link className='text-indigo-300' to={"/"}>Jetzt Terminausmachen <FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            <div
              className="row-span-1 bg-black rounded-md border border-[#222] p-6">
              <h3>Die beste Haarpflege:</h3>
              <Link className='text-indigo-300' to={"/"}>Zum Shop <FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            <div
              className="row-span-2 bg-black rounded-md border border-[#222] p-6 col-span-2">
              <h2>Neue Frisur gefällig?</h2>
              <Link className='text-indigo-300' to={"/"}>Jetzt Termin ausmachen <FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            <div
              className="row-span-1 bg-black rounded-md border border-[#222] p-6 col-span-2">
              <h3>Neue Frisur gefällig?</h3>
              <Link className='text-indigo-300' to={"/"}>Jetzt Termin ausmachen <FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>

          </div>
        </div>
      </div>
    </section>
    {/* <DoubleSec props={{
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
    }} /> */}
    <DoubleSec props={{
      left: true,
      sectionClass: "relative ",
      sectionName: "second",
      children: (<>
        <div className='hidden grid-cols-1  relative  relative h-full w-full m-auto max-h-[70%] justify-center align-center z-10 md:grid'>
          <div className='flex justify-center align-center flex-col p-5'>
            <Tiles bgPosition="bg-center" addClass="img__wrapper" gridClass="feature-grid" array={icons} />

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
        <div className="flex justify-center h-full min-w-0 align-center flex-col bg-[#0f0f0f00] p-0 realative md:bg-[#0f0f0f] md:sec-pad_left md:sec-pad_right">
          <div className='flex gap-5 flex-col'>
            <div className='my-4 md:px-8'>
              <dd className='text-[var(--clr-contrast-400)] text:md md:text-xl font-bold'>Unsere Philosophie:</dd>
              <h2 className=''>Bei uns sind Alle herzlich willkommen...</h2>
              <p className='font-extrabold text-xl md:text-2xl'>... wir freuen uns über deinen Besuch!</p>
            </div>
            <Tiles bgPosition="bg-center" addClass="img__wrapper" gridClass="feature-grid" array={icons} />
            <ImageCarousel className="img_carousel-wrapper my-6" images={icons} />
            <div className='my-4 md:px-8'>
              <p className='my-2'>Ein umfangreiches Angebot erwartet dich bei uns! Was auch immer Dir vorschwebt, zusammen werden wir deine Vorstellung Realität werden lassen.</p>
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
                <div className='rounded-br-lg w-full min-h-[200px]  h-[100%] flex-[1_1_100%] bg-cover bg-top' style={{ backgroundImage: `url("/images/stephan.webp")` }}></div>
              </div>
              <div className='flex flex-nowrap w-auto flex-[1_1_50%] h-full justify-start img__wrapper'>
                {/* <Tiles gridClass="about-grid about-grid-right" array={simonBilder} perspective={false}/> */}
                <div className='rounded-br-lg w-full min-h-[200px] h-[100%] flex-[1_1_100%] bg-cover bg-top' style={{ backgroundImage: `url("/images/simon.webp")` }}></div>
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
            <div className='flex flex-col bg-center bg-cover h-[400px] md:h-full' style={{ backgroundImage: `url('${products}')` }}></div>
            <div className=' img__wrapper '>
              <h2>Finde tolle Produkte</h2>
              <p>...die zu dir passen.</p>
            </div>
            {/* <img className="my-0 z-[2] w-full" src={products} alt="Stephan und Simon" style={{ scale: "1", transformOrigin: "bottom right", maxWidth:"500px" }} /> */}
            <div className=' img__wrapper '>
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
  </>
  );
}


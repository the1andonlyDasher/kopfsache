import { ReactNode, useEffect, Suspense, useState, useRef } from "react";
import { Drawer, useDrawer } from "./Drawer";
import { Await, useMatches, useFetchers, useLocation, Outlet, useOutlet, useLoaderData, Link } from '@remix-run/react';
import { CartLineItems, CartActions, CartSummary } from './Cart';
import { AnimatePresence, motion, useAnimationControls, useIsPresent } from "framer-motion";
import logo from "../images/logo.png"
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { CookieConsent } from "./CookieConsent";
import FwdGL from "./GL";


interface LayoutProps {
  title: string;
}

function CartHeader({ cart, openDrawer }: any) {
  return (
    <Suspense>
      <Await resolve={cart}>
        {(data) => (
          <button
            className="relative flex items-center justify-center w-8 h-8"
            onClick={openDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <title>Bag</title>
              <path
                fillRule="evenodd"
                d="M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z"
              ></path>
            </svg>
            {data?.totalQuantity > 0 && (
              <div className="text-contrast bg-red-500 text-white absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px">
                <span>{data?.totalQuantity}</span>
              </div>
            )}
          </button>
        )}
      </Await>
    </Suspense>
  );
}

export function AnimatedOutlet() {
  const o = useOutlet()
  const [outlet] = useState(o)
  return <Suspense fallback={<div>Suspense</div>}>{outlet}</Suspense>;
}

export function Layout({ title }: LayoutProps) {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const fetchers = useFetchers();
  const toggle = useRef<any>(!null);
  const ref = useRef<any>(!null);
  const [root]: any = useMatches();
  const location = useLocation()
  const cart = root.data?.cart;
  const outlet = useOutlet()
  const [toggled, setToggle] = useState(false)
  const [open, setOpen] = useState(false)
  const isPresent = useIsPresent();

  // Grab all the fetchers that are adding to cart
  const addToCartFetchers = [];
  for (const fetcher of fetchers) {
    if (fetcher?.formData?.get('cartAction') === 'ADD_TO_CART') {
      addToCartFetchers.push(fetcher);
    }
  }

  // When the fetchers array changes, open the drawer if there is an add to cart action
  useEffect(() => {
    if (isOpen || addToCartFetchers.length === 0) return;
    openDrawer();
  }, [addToCartFetchers]);

  const handExitComplete = () => {
    window.scrollTo(0, 0);
    if (typeof window !== "undefined") {
      // Get the hash from the url
      const hashId = window.location.hash;

      if (hashId) {
        // Use the hash to find the first element with that id
        const element = document.querySelector(`${hashId}`);

        if (element) {
          // Smooth scroll to that elment
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
          // console.log("scrollToHash");
        }
      }
      // else {
      //   window.scrollTo(0,0)
      //   console.log("scrollTop")
      // }
    }
  };

  const variants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { type: "tween", ease: "easeIn", duration: 0.5, staggerChildren: 0.2, when: "beforeChildren" } },
    exit: { opacity: 0, transition: { type: "tween", ease: "easeOut", duration: 0.5, staggerChildren: 0.1, staggerDirection: -1, when: "afterChildren" } },
  }

  const menuVariant = {
    hidden: { left: "-100%", transition: { type: "tween", ease: "easeOut", duration: 0.25, staggerChildren: 0.1, staggerDirection: -1, when: "afterChildren" } },
    enter: { left: 0, transition: { type: "tween", ease: "easeIn", duration: 0.25, staggerChildren: 0.1, when: "beforeChildren" } },

  }

  const toggle_variants = {
    hidden: {},
    enter: { transition: { type: "tween", ease: "easeIn", duration: 0.5 } },
  }

  const list_variants = {
    open: { scaleY: 1, transition: { staggerChildren: 0.2, when: "beforeChildren" } },
    closed: { scaleY: 0, transition: { staggerChildren: 0.2, when: "afterChildren" } },
  }

  const listTwo_variants = {
    hidden: { x: -10, opacity: 0, transition: { staggerChildren: 0.2, when: "afterChildren" } },
    enter: { x: 0, opacity: 1, transition: { staggerChildren: 0.2, when: "beforeChildren" } },
  }

  const listItemTwo_variants = {
    hidden: { opacity: 0, x: -10, transition: { ease: "easeOut" } },
    enter: { opacity: 1, x: 0, transition: { ease: "easeIn" } },

  }

  const listItem_variants = {
    open: { opacity: 1, x: 0, transition: { ease: "easeIn" } },
    closed: { opacity: 0, x: -10, transition: { ease: "easeOut" } },
  }

  return (
    <div ref={ref} className="flex flex-col min-h-screen antialiased snap-y snap-mandatory overflow-hidden">
      <motion.header
        variants={toggle_variants}
        initial="hidden"
        animate={toggled ? "enter" : "hidden"}
        role="banner"
        className={`mainnav flex items-center h-16 sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 antialiased transition shadow-sm `}
      >
        <div className="flex gap-12 ">
          <a className="uppercase text-2xl font-normal" style={{ fontFamily: "Yanone Kaffeesatz" }} href="/">
            {title}
          </a>

        </div>
        <img
          src={logo}
          className="w-auto max-h-[25px]"
          alt="Kopfsache by Stephan Logo"
          width={50}
          height={50}
        />
        <div className="ml-auto desktop">
          <ul className="menu px-5 flex flex-row flex-nowrap">
            <li className="px-5"><Link to="/">Home</Link></li>
            <li className="px-5"><Link to="/about">Über uns</Link></li>
            <li className="px-5"><Link to="/collections/kopfsache">Shop</Link></li>
            <li className="px-5"><Link to="/prices">Preise</Link></li>
            <li className="px-5"><Link to="/contact">Kontakt</Link></li>
          </ul>
        </div>
        <motion.div

          ref={toggle}
          onClick={() => { setToggle(!toggled), setOpen(false) }}
          id="menu-toggle"
          className="ml-auto mobile"
        >
          <motion.div variants={{ hidden: { rotate: 0, top: "30%" }, enter: { rotate: 45, top: "50%" } }} className="origin-center translate-y-[-50%]"></motion.div>
          <motion.div variants={{ hidden: { rotate: 0, top: "70%" }, enter: { rotate: -45, top: "50%" } }} className="origin-center translate-y-[-50%]"></motion.div>
        </motion.div>
        <motion.div variants={menuVariant} className="mobile flex flex-col absolute top-16 left-[-100%] h-[100vh] w-full bg-[#111]">
          <motion.ul variants={listTwo_variants} className="flex flex-col flex-nowrap justify-start items-center w-full px-6 pt-[5%]">
            <motion.li variants={listItemTwo_variants} className="py-6 pl-4 border-l border-[#222] mx-auto w-full text-3xl md:text-4xl text-left font-['Economica']" onClick={() => setToggle(!toggled)}><Link to="/">Home</Link></motion.li>
            <motion.li variants={listItemTwo_variants} className="py-6 pl-4 border-l border-[#222] mx-auto w-full text-3xl md:text-4xl text-left font-['Economica']" onClick={() => setToggle(!toggled)}><Link to="/about">Über uns</Link></motion.li>
            <motion.li variants={listItemTwo_variants} className="py-6 pl-4 border-l border-[#222] mx-auto w-full text-3xl md:text-4xl text-left font-['Economica']" onClick={() => setToggle(!toggled)}><Link to="/collections/kopfsache">Shop</Link></motion.li>
            <motion.li variants={listItemTwo_variants} className="py-6 pl-4 border-l border-[#222] mx-auto w-full text-3xl md:text-4xl text-left font-['Economica']" onClick={() => setToggle(!toggled)}><Link to="/prices">Preise</Link></motion.li>
            <motion.li variants={listItemTwo_variants} className="py-6 pl-4 border-l border-[#222] mx-auto w-full text-3xl md:text-4xl text-left font-['Economica']" onClick={() => setToggle(!toggled)}><Link to="/contact">Kontakt</Link></motion.li>
            <motion.li variants={listItemTwo_variants} className="flex flex-row justify-start gap-4 py-6 pl-4 border-l border-[#222] mx-auto w-full text-3xl md:text-4xl text-left font-['Economica'] text-gray-500" onClick={() => setOpen(!open)}><div>Öffnungszeiten</div><motion.div className="w-10 h-10" animate={open ? { rotate: "180deg" } : { rotate: "0deg" }}><FontAwesomeIcon icon={faChevronDown} className="text-thin text-md" /></motion.div></motion.li>
          </motion.ul>
          <motion.ul variants={list_variants} animate={open ? "open" : "closed"} className="p-6 w-full">
            <motion.li variants={listItem_variants} className="flex flex-row space-between py-2"><h5>Di-Do</h5><h5 className="ml-auto">08:30 - 18:30</h5></motion.li>
            <motion.li variants={listItem_variants} className="flex flex-row space-between py-2"><h5>Fr</h5><h5 className="ml-auto">10:00 - 20:00</h5></motion.li>
            <motion.li variants={listItem_variants} className="flex flex-row space-between py-2"><h5>Sa</h5><h5 className="ml-auto">08:30 - 15:00</h5></motion.li>
          </motion.ul>
        </motion.div>
        {/* <div className={location.pathname.includes("collections/kopfsache") ? "block" : "hidden"}> */}
        <CartHeader cart={cart} openDrawer={openDrawer} />
        {/* </div> */}
      </motion.header>
      <AnimatePresence
        mode="wait"
        onExitComplete={handExitComplete}
        initial={true}>
        <motion.main

          role="main"
          className="main"
          key={useLocation().pathname}
          variants={variants}
          initial="initial"
          animate="enter"
          exit="leave">
          <AnimatedOutlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FwdGL eventSource={ref} position={undefined} fov={15} />
      <Drawer open={isOpen} onClose={closeDrawer}>
        <CartDrawer cart={cart} close={closeDrawer} />
      </Drawer>
    </div>


  );
}

function CartDrawer({ cart, close }: any) {
  return (
    <Suspense>
      <Await resolve={cart}>
        {(data) => (
          <>
            {data?.totalQuantity > 0 ? (
              <>
                <div className="flex-1 overflow-y-auto">
                  <div className="flex flex-col space-y-7 justify-between items-center md:py-8 md:px-12 px-4 py-6">
                    <CartLineItems linesObj={data.lines} />
                  </div>
                </div>
                <div className="w-full md:px-12 px-4 py-6 space-y-6">
                  <CartSummary cost={data.cost} />
                  <CartActions checkoutUrl={data.checkoutUrl} />
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-7 justify-center items-center md:py-8 md:px-12 px-4 py-6 h-screen">
                <h2 className="whitespace-pre-wrap max-w-prose font-bold text-4xl">
                  Der Warenkorb ist leer
                </h2>
                <button
                  onClick={close}
                  className="inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none bg-black text-white w-full"
                >
                  Weiter einkaufen
                </button>
              </div>
            )}
          </>
        )}
      </Await>
    </Suspense>
  );
}

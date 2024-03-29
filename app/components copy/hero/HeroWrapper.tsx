import Hero from "./Hero";
import Tiles from "./Tiles";

interface HeroWrapperProps {
  sectionName: string,
  id: string
}

const HeroWrapper = ({  sectionName, id }: HeroWrapperProps) => {
  return (
    <>
      <section data-section-name={sectionName} id={id}>
        <div className="__s__b">
          <div className="lr__wrapper">
            <div id="left-wrapper">
              <Hero />
            </div>
            <div id="right-wrapper">
              <Tiles />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroWrapper;

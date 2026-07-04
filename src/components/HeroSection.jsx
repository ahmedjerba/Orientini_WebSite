import HeroText from './hero/HeroText';
import Countdown from './hero/Countdown';
import HeroVisual from './hero/HeroVisual';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-8 md:py-12 flex items-center justify-center">
      {/* Vagues de fond */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-pourpre/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

        {/* BLOC GAUCHE : TEXTES + DECOMPTE */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <HeroText />
          <Countdown />
        </div>

        {/* BLOC DROIT : VISUEL */}
        <div className="lg:col-span-5">
          <HeroVisual />
        </div>

      </div>
    </section>
  );
}
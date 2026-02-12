import { Text } from "../components/hero/Text";

export const Hero = () => {
  return (
    <div className="relative h-[90vh] flex justify-center items-center overflow-hidden">
      {/* Background Image with Parallax-like fixed position */}
      <div 
        className="absolute inset-0 bg-HeroImg bg-cover bg-center bg-fixed z-0 transform scale-105"
      ></div>
      
      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-light-50/90 via-light-50/50 to-transparent dark:from-dark-900/90 dark:via-dark-900/60 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-light-50 via-transparent to-transparent dark:from-dark-900 z-10"></div>
      
      {/* Content */}
      <div className="wrapper relative z-20 w-full">
        <Text />
      </div>
    </div>
  );
};

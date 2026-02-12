import Card from "../../../../components/ui/Card";
import { Items } from "./items";

const Texto = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="text-right">
         <span className="text-gold-500 font-bold tracking-widest uppercase text-sm">
          Detalles que Enamoran
        </span>
        <h2 className="font-serif text-4xl Laptop:text-5xl mt-2 text-dark-800 dark:text-white">
          Dijes Exclusivos
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Items.map((item) => (
          <Card key={item.id} className="p-0 overflow-hidden group">
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={item.img} 
                alt={`Foto de ${item.name}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                 <h3 className="font-serif text-2xl text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {item.name}
                </h3>
                <p className="text-light-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {item.text}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Texto;

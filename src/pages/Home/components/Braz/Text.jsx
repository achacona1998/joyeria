import Card from "../../../../components/ui/Card";
import { Items } from "./items";

const Texto = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <span className="text-gold-500 font-bold tracking-widest uppercase text-sm">
          Colección de Temporada
        </span>
        <h2 className="font-serif text-4xl Laptop:text-5xl text-dark-800 dark:text-white">
          Brazaletes y Tobilleras
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {Items.map((item) => (
          <Card key={item.id} className="flex flex-col md:flex-row overflow-hidden p-0 group">
             <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative overflow-hidden">
               <img 
                 src={item.img} 
                 alt={`Foto de ${item.name}`} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
             </div>
             <div className="w-full md:w-1/2 p-8 flex flex-col justify-center gap-4 bg-white dark:bg-dark-800">
               <h3 className="font-serif text-3xl text-dark-800 dark:text-white">
                 {item.name}
               </h3>
               <p className="text-dark-600 dark:text-light-200 leading-relaxed">
                 {item.text}
               </p>
               <button className="text-gold-500 font-bold uppercase tracking-wider text-sm self-start hover:text-gold-600 transition-colors mt-2">
                 Ver Detalles &rarr;
               </button>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Texto;

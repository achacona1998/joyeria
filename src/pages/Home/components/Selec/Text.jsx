import Card from "../../../../components/ui/Card";
import { Items } from "./items";

const Texto = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-serif text-4xl Laptop:text-5xl mb-4 text-dark-800 dark:text-white">
          Nuestra Amplia Selección
        </h2>
        <div className="h-1 w-20 bg-gold-400 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Items.map((item) => (
          <Card key={item.id} className="h-full flex flex-col group overflow-hidden p-0">
            <div className="relative overflow-hidden aspect-[4/5]">
              <img 
                src={item.img} 
                alt={`Foto de ${item.name}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="p-6 flex flex-col gap-3 flex-1 bg-white dark:bg-dark-800">
              <h3 className="font-serif text-2xl text-dark-800 dark:text-white group-hover:text-gold-500 transition-colors">
                {item.name}
              </h3>
              <p className="text-dark-600 dark:text-light-200 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Texto;

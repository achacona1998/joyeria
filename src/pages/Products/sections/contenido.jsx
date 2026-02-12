import { Link } from "react-router-dom";
import { Items } from "../components/items";
import useCounts from "../../../hooks/count";
import Card from "../../../components/ui/Card";

export const Contenido = () => {
  const anilloCount = useCounts("anillo").count;
  const areteCount = useCounts("arete").count;
  const cadenaCount = useCounts("cadena").count;
  const brazaleteCount = useCounts("brazalete").count;
  const tobilleraCount = useCounts("tobillera").count;
  const pircingCount = useCounts("pircing").count;
  const dijeCount = useCounts("dije").count;

  const countsMap = {
    anillo: anilloCount,
    arete: areteCount,
    cadena: cadenaCount,
    brazalete: brazaleteCount,
    tobillera: tobilleraCount,
    pircing: pircingCount,
    dije: dijeCount,
  };

  const itemsConCount = Items.map((item) => {
    const joyaSinS = item.name.slice(0, -1).toLowerCase();
    return {
      ...item,
      count: countsMap[joyaSinS] || 0,
    };
  });

  return (
    <div className="pt-28 pb-20 min-h-screen transition-colors duration-300 bg-light-50 dark:bg-dark-900">
      <div className="wrapper">
        <div className="mb-12 text-center">
          <span className="block mb-2 text-sm font-bold tracking-widest uppercase text-gold-500">
            Explora Nuestras Colecciones
          </span>
          <h1 className="font-serif text-5xl Laptop:text-6xl text-dark-800 dark:text-white">
            Catálogos
          </h1>
          <div className="mx-auto mt-6 w-24 h-1 rounded-full bg-gold-400"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {itemsConCount.map((item) => (
            <Link key={item.id} to={`/${item.name}`}>
              <Card className="overflow-hidden p-0 h-full cursor-pointer group hover:shadow-glow">
                <div className="overflow-hidden relative aspect-square">
                  <img
                    src={item.img}
                    alt={`Imagen de ${item.name}`}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t to-transparent opacity-60 transition-opacity from-black/70 via-black/20 group-hover:opacity-80"></div>

                  <div className="absolute bottom-0 left-0 p-6 w-full text-white transition-transform duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <h3 className="mb-1 font-serif text-3xl">{item.name}</h3>
                    <div className="flex gap-2 items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-gold-500"></span>
                      <p className="text-sm font-medium tracking-wider uppercase text-gold-100">
                        {item.count} Artículos
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

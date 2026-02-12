import img1 from "../assets/img/productos/1.jpg";
import img2 from "../assets/img/productos/2.jpg";
import img3 from "../assets/img/productos/3.jpg";
import img4 from "../assets/img/productos/4.jpg";
import img5 from "../assets/img/productos/5.jpg";
import img6 from "../assets/img/productos/6.jpg";
import img7 from "../assets/img/productos/7.jpg";

import png1 from "../assets/img/Imagen1.png";
import png2 from "../assets/img/Imagen2.png";
import png3 from "../assets/img/Imagen3.png";
import png4 from "../assets/img/Imagen4.png";
import png5 from "../assets/img/Imagen5.png";
import png6 from "../assets/img/Imagen6.png";
import png7 from "../assets/img/Imagen7.png";
import png8 from "../assets/img/Imagen8.png";
import png9 from "../assets/img/Imagen9.png";
import png10 from "../assets/img/Imagen10.png";
import png11 from "../assets/img/Imagen11.png";
import png12 from "../assets/img/Imagen12.png";

// Helper to get random image from the png list if needed
// For now we use the main product images and some placeholders
// or we can import all pngs. To keep it simple, I'll use the 7 jpgs and reuse them,
// or map some specific pngs if I knew what they were.
// I'll assume the user wants me to use the files in `src/assets/img` broadly.

const products = [
  // Anillos
  {
    id: 1,
    name: "Anillo de Oro 18k con Diamante",
    description:
      "Elegante anillo de compromiso en oro de 18 kilates con un diamante central de 0.5 quilates.",
    price: 1250.0,
    category: "anillos",
    stock: 5,
    image: img1,
    rating: 4.8,
    pureza: "18k",
    peso_neto: 4.5,
    size: "6",
    genero_usuario: "Mujer",
    tipo_anillo: "Compromiso",
  },
  {
    id: 2,
    name: "Anillo de Plata Sterling",
    description:
      "Anillo minimalista de plata 925, perfecto para el uso diario.",
    price: 45.0,
    category: "anillos",
    stock: 15,
    image: png1,
    rating: 4.2,
    pureza: "925",
    peso_neto: 3.2,
    size: "7",
    genero_usuario: "Unisex",
    tipo_anillo: "Casual",
  },
  {
    id: 3,
    name: "Anillo con Zafiro Azul",
    description:
      "Anillo de oro blanco con un zafiro azul profundo y detalles en diamantes.",
    price: 890.0,
    category: "anillos",
    stock: 3,
    image: png2,
    rating: 4.9,
    pureza: "14k",
    peso_neto: 3.8,
    size: "6.5",
    genero_usuario: "Mujer",
    tipo_anillo: "Lujo",
  },
  {
    id: 4,
    name: "Anillo Entrelazado",
    description: "Diseño moderno con bandas entrelazadas de oro rosa y plata.",
    price: 180.0,
    category: "anillos",
    stock: 8,
    image: png3,
    rating: 4.5,
    pureza: "14k",
    peso_neto: 5.0,
    size: "8",
    genero_usuario: "Mujer",
    tipo_anillo: "Moda",
  },

  // Aretes
  {
    id: 5,
    name: "Aretes de Perla Cultivada",
    description: "Clásicos aretes de perla cultivada con base de oro 14k.",
    price: 120.0,
    category: "aretes",
    stock: 20,
    image: img2,
    rating: 4.6,
    pureza: "14k",
    peso_neto: 2.1,
    size: "Estándar",
    genero_usuario: "Mujer",
  },
  {
    id: 6,
    name: "Aretes Colgantes de Cristal",
    description: "Aretes largos con cristales Swarovski que capturan la luz.",
    price: 65.0,
    category: "aretes",
    stock: 12,
    image: png4,
    rating: 4.3,
    pureza: "Plata 925",
    peso_neto: 4.0,
    size: "Largo",
    genero_usuario: "Mujer",
  },
  {
    id: 7,
    name: "Aretes de Aro Dorados",
    description: "Aros grandes bañados en oro, un básico indispensable.",
    price: 35.0,
    category: "aretes",
    stock: 25,
    image: png5,
    rating: 4.1,
    pureza: "Baño Oro",
    peso_neto: 5.5,
    size: "Grande",
    genero_usuario: "Mujer",
  },

  // Cadenas
  {
    id: 8,
    name: "Cadena de Oro 24k",
    description: "Cadena clásica de eslabones cubanos en oro puro de 24k.",
    price: 2500.0,
    category: "cadenas",
    stock: 2,
    image: img3,
    rating: 5.0,
    pureza: "24k",
    peso_neto: 15.0,
    size: "50cm",
    genero_usuario: "Unisex",
  },
  {
    id: 9,
    name: "Collar con Colgante de Corazón",
    description: "Delicada cadena de plata con un colgante de corazón.",
    price: 55.0,
    category: "cadenas",
    stock: 18,
    image: png6,
    rating: 4.4,
    pureza: "925",
    peso_neto: 4.2,
    size: "45cm",
    genero_usuario: "Mujer",
  },
  {
    id: 10,
    name: "Gargantilla de Terciopelo",
    description: "Choker de terciopelo negro con dije de luna en plata.",
    price: 25.0,
    category: "cadenas",
    stock: 30,
    image: png7,
    rating: 4.0,
    pureza: "Acero",
    peso_neto: 2.0,
    size: "Ajustable",
    genero_usuario: "Mujer",
  },

  // Brazaletes
  {
    id: 11,
    name: "Brazalete Rígido de Oro",
    description: "Brazalete estilo esclava en oro amarillo pulido.",
    price: 450.0,
    category: "brazaletes",
    stock: 6,
    image: img4,
    rating: 4.7,
    pureza: "18k",
    peso_neto: 12.0,
    size: "18cm",
    genero_usuario: "Mujer",
  },
  {
    id: 12,
    name: "Pulsera de Charm",
    description:
      "Pulsera de plata compatible con charms, incluye broche de seguridad.",
    price: 80.0,
    category: "brazaletes",
    stock: 15,
    image: png8,
    rating: 4.5,
    pureza: "925",
    peso_neto: 8.5,
    size: "19cm",
    genero_usuario: "Mujer",
  },

  // Tobilleras
  {
    id: 13,
    name: "Tobillera de Oro con Cascabeles",
    description: "Divertida tobillera de oro con pequeños cascabeles sonoros.",
    price: 150.0,
    category: "tobilleras",
    stock: 10,
    image: img5,
    rating: 4.3,
    pureza: "14k",
    peso_neto: 4.0,
    size: "Ajustable",
    genero_usuario: "Mujer",
  },
  {
    id: 14,
    name: "Tobillera de Hilo Trenzado",
    description:
      "Tobillera bohemia de hilo resistente al agua con detalles en plata.",
    price: 20.0,
    category: "tobilleras",
    stock: 50,
    image: png9,
    rating: 4.2,
    pureza: "Hilo/Plata",
    peso_neto: 1.5,
    size: "Ajustable",
    genero_usuario: "Unisex",
  },

  // Pircings
  {
    id: 15,
    name: "Piercing de Nariz con Diamante",
    description:
      "Piercing discreto para la nariz con un pequeño diamante real.",
    price: 90.0,
    category: "pircings",
    stock: 20,
    image: img6,
    rating: 4.6,
    pureza: "18k",
    peso_neto: 0.5,
    size: "Mini",
    genero_usuario: "Unisex",
  },
  {
    id: 16,
    name: "Piercing de Ombligo Acero",
    description: "Piercing de acero quirúrgico con cristal rosa.",
    price: 15.0,
    category: "pircings",
    stock: 40,
    image: png10,
    rating: 4.1,
    pureza: "Acero 316L",
    peso_neto: 2.0,
    size: "Estándar",
    genero_usuario: "Mujer",
  },

  // Dijes
  {
    id: 17,
    name: "Dije de Cruz de Oro",
    description: "Dije en forma de cruz con detalles tallados a mano.",
    price: 110.0,
    category: "dijes",
    stock: 12,
    image: img7,
    rating: 4.8,
    pureza: "14k",
    peso_neto: 3.5,
    size: "3cm",
    genero_usuario: "Unisex",
    tipo_dije: "Religioso",
  },
  {
    id: 18,
    name: "Dije de Letra Inicial",
    description: "Dije personalizado con tu inicial en plata esterlina.",
    price: 30.0,
    category: "dijes",
    stock: 100,
    image: png11,
    rating: 4.5,
    pureza: "925",
    peso_neto: 2.0,
    size: "1.5cm",
    genero_usuario: "Unisex",
    tipo_dije: "Personalizado",
  },
  {
    id: 19,
    name: "Dije Árbol de la Vida",
    description: "Símbolo del árbol de la vida en oro rosa y nácar.",
    price: 140.0,
    category: "dijes",
    stock: 8,
    image: png12,
    rating: 4.7,
    pureza: "Oro Rosa 14k",
    peso_neto: 4.0,
    size: "2.5cm",
    genero_usuario: "Mujer",
    tipo_dije: "Simbólico",
  },
];

// Map properties to match what the existing components expect
// Existing components expect: id, name, photo, precio_unidad, cantUnidades, tipo_producto (maybe)
export const getProducts = () => {
  return products.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    precio_unidad: p.price, // Mapping price to precio_unidad
    cantUnidades: p.stock, // Mapping stock to cantUnidades
    photo: p.image, // Mapping image to photo
    tipo_producto: p.category, // Mapping category to tipo_producto
    category: p.category,
    rating: p.rating,
    pureza: p.pureza,
    peso_neto: p.peso_neto,
    size: p.size,
    genero_usuario: p.genero_usuario,
    tipo_anillo: p.tipo_anillo,
    tipo_dije: p.tipo_dije,
  }));
};

export const getProductsByCategory = (category) => {
  const all = getProducts();
  if (!category || category === "all") return all;
  // Normalize category (remove 's' if needed or match exact)
  // The existing code handles 's' removal, so we should expect the category string passed to match or be close.
  // We'll do a loose match.
  const term = category.toLowerCase();
  // Handle plural/singular matching simple logic
  const singular = term.endsWith("s") ? term.slice(0, -1) : term;

  return all.filter(
    (p) =>
      p.category.toLowerCase().includes(singular) ||
      p.category.toLowerCase() === term,
  );
};

export const getProductById = (id) => {
  return getProducts().find((p) => p.id === parseInt(id));
};

export default products;

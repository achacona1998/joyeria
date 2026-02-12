import { useContext, useEffect, useState } from "react";
import { CartContext, MonedaContext } from "../../../context/contexto";
import { getCardColor } from "../../../utils/formUtils";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { TarjetaAnimada } from "../components/tarjetaAnimada";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { formatPrecioParaTextarea } from "../../../utils/precio";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  MapPin,
  CreditCard,
  Calendar,
  Lock,
  Truck,
  Store,
  Check,
  AlertCircle,
} from "lucide-react";

const MultiStepForm = () => {
  const navigate = useNavigate();
  const { cart, vaciar } = useContext(CartContext);
  const [step, setStep] = useState(1);
  const [exp, setExp] = useState("");
  const [domicilio, setDomicilio] = useState(false);
  const [tienda, setTienda] = useState(false);
  const [error, setError] = useState("");
  const [direccion, setDireccion] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    tarjeta: "",
    items: [], // Inicialmente vacío
  });
  const cardColor = getCardColor(formData.tarjeta);
  const { moneda } = useContext(MonedaContext);

  // Sincroniza los datos del carrito con formData.items
  useEffect(() => {
    const updatedItems = cart.map((item) => ({
      producto_id: item.id || "",
      nombre_articulo: item.name || "",
      tipo_producto: item.tipo_producto || "",
      cantidad: item.cantidadCompra || "",
      precio_unitario: item.precio_unidad || 0,
    }));
    setFormData((prevData) => ({
      ...prevData,
      items: updatedItems,
    }));
  }, [cart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.nombre || !formData.apellidos) {
        setError("Por favor, completa todos los campos.");
        return;
      }
      if (!domicilio && !tienda) {
        setError("Debes seleccionar un método de entrega.");
        return;
      }
      if (domicilio && !direccion.trim()) {
        setError("Debes ingresar una dirección para la entrega a domicilio.");
        return;
      }
    }

    if (step === 2) {
      if (!formData.tarjeta || !exp) {
        setError("Por favor, completa los datos de la tarjeta.");
        return;
      }
    }

    setError(""); // Limpia errores si todo está bien
    setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si la tarjeta es válida antes de enviar el formulario
    const cleanCardNumber = formData.tarjeta.replace(/\s/g, "");
    if (cleanCardNumber.length !== 16 || !validarTarjeta(cleanCardNumber)) {
      toast.error("El número de tarjeta no es válido.");
      return; // Detener el envío del formulario si la tarjeta no es válida
    }

    try {
      // Simulación de envío de orden (Backend replacement)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 segundos de delay

      // Aquí se podría guardar la orden en localStorage o similar si se desea persistencia de historial
      // const ordenes = JSON.parse(localStorage.getItem('orders') || '[]');
      // ordenes.push({ ...formData, date: new Date().toISOString(), id: crypto.randomUUID() });
      // localStorage.setItem('orders', JSON.stringify(ordenes));

      vaciar();
      toast.success("¡Orden creada exitosamente!");
      navigate("/");
    } catch (error) {
      toast.error(
        "Hubo un problema al procesar la orden. Por favor, inténtalo nuevamente.",
      );
    }
  };

  function validarTarjeta(numero) {
    // Convertir el número a una cadena y luego a un array de dígitos
    const digitos = numero.split("").map(Number);

    // Verificar que tenga 16 dígitos
    if (digitos.length !== 16) {
      return false;
    }

    // Aplicar el algoritmo de Luhn
    let suma = 0;
    let invertir = false;

    // Recorrer los dígitos de derecha a izquierda
    for (let i = digitos.length - 1; i >= 0; i--) {
      let d = digitos[i];
      if (invertir) {
        d *= 2;
        if (d > 9) {
          d -= 9;
        }
      }
      suma += d;
      invertir = !invertir;
    }

    // Verificar si la suma es divisible por 10
    return suma % 10 === 0;
  }

  const handleChangeCardNumber = (e) => {
    const value = e.target.value;
    // Eliminar caracteres no numéricos y agregar espacio cada 4 dígitos
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

    // Actualiza el estado de la tarjeta
    setFormData({ ...formData, tarjeta: formattedValue });

    // Eliminar los espacios y verificar si tiene exactamente 16 dígitos
    const cleanCardNumber = formattedValue.replace(/\s/g, "");

    if (cleanCardNumber.length === 16) {
      // Validar tarjeta solo cuando tenga exactamente 16 dígitos
      if (!validarTarjeta(cleanCardNumber)) {
        setError("El número de tarjeta no es válido.");
      } else {
        setError(""); // Limpia el error si la tarjeta es válida
      }
    } else {
      // No validar si no tiene exactamente 16 dígitos
      setError("");
    }
  };

  const handleDeliveryChange = (tipo) => {
    if (tipo === "domicilio") {
      setDomicilio(true);
      setTienda(false);
    } else {
      setTienda(true);
      setDomicilio(false);
    }
    setError(""); // Limpiar error al seleccionar una opción
  };

  const textareaValue = formData.items
    .map(
      (item) =>
        `${item.nombre_articulo} - ${formatPrecioParaTextarea(
          item.precio_unitario,
          moneda,
        )} - x${item.cantidad}`,
    )
    .join("\n");

  const variants = {
    enter: { x: 20, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  };

  const StepIndicator = ({ currentStep }) => (
    <div className="flex justify-center items-center mb-10 w-full">
      <div className="flex items-center group">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
            currentStep >= 1
              ? "border-gold-500 bg-gold-50 text-gold-600 dark:bg-gold-900/20 dark:text-gold-400 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
              : "border-gray-200 text-gray-300 dark:border-gray-700 dark:text-gray-600"
          } font-bold font-bodoni text-lg`}>
          1
        </div>
        <span
          className={`ml-3 font-medium text-sm hidden sm:block transition-colors duration-300 ${
            currentStep >= 1
              ? "text-gold-600 dark:text-gold-400"
              : "text-gray-400 dark:text-gray-600"
          }`}>
          Envío
        </span>
      </div>
      <div
        className={`w-16 h-0.5 mx-4 transition-all duration-500 ${
          currentStep >= 2
            ? "bg-gradient-to-r from-gold-500 to-gold-300"
            : "bg-gray-200 dark:bg-gray-700"
        }`}
      />
      <div className="flex items-center group">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
            currentStep >= 2
              ? "border-gold-500 bg-gold-50 text-gold-600 dark:bg-gold-900/20 dark:text-gold-400 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
              : "border-gray-200 text-gray-300 dark:border-gray-700 dark:text-gray-600"
          } font-bold font-bodoni text-lg`}>
          2
        </div>
        <span
          className={`ml-3 font-medium text-sm hidden sm:block transition-colors duration-300 ${
            currentStep >= 2
              ? "text-gold-600 dark:text-gold-400"
              : "text-gray-400 dark:text-gray-600"
          }`}>
          Pago
        </span>
      </div>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-2xl">
      <StepIndicator currentStep={step} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-8">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-bodoni">
                  Datos de Envío
                </h2>
                <p className="font-light text-gray-500 dark:text-gray-400">
                  ¿A dónde enviaremos tus joyas?
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: Juan"
                  icon={<User className="w-5 h-5" />}
                />
                <Input
                  label="Apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  placeholder="Ej: Pérez García"
                  icon={<User className="w-5 h-5" />}
                />
              </div>

              <div className="space-y-4">
                <span className="block ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Método de Entrega
                </span>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div
                    onClick={() => handleDeliveryChange("domicilio")}
                    className={`
                      relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${
                        domicilio
                          ? "border-gold-500 bg-gold-50/50 dark:bg-gold-900/20 dark:border-gold-500/50"
                          : "bg-white border-gray-100 dark:bg-white/5 dark:border-white/10 hover:border-gold-200 dark:hover:border-gold-500/30"
                      }
                    `}>
                    <div
                      className={`p-2 rounded-full ${domicilio ? "bg-gold-100 text-gold-600 dark:bg-gold-500/20" : "text-gray-500 bg-gray-100 dark:bg-white/10"}`}>
                      <Truck className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-medium ${domicilio ? "text-gold-900 dark:text-gold-100" : "text-gray-900 dark:text-gray-100"}`}>
                        Envío a Domicilio
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Recibe en tu puerta
                      </p>
                    </div>
                    {domicilio && (
                      <div className="absolute top-3 right-3 text-gold-500">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() => handleDeliveryChange("tienda")}
                    className={`
                      relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${
                        tienda
                          ? "border-gold-500 bg-gold-50/50 dark:bg-gold-900/20 dark:border-gold-500/50"
                          : "bg-white border-gray-100 dark:bg-white/5 dark:border-white/10 hover:border-gold-200 dark:hover:border-gold-500/30"
                      }
                    `}>
                    <div
                      className={`p-2 rounded-full ${tienda ? "bg-gold-100 text-gold-600 dark:bg-gold-500/20" : "text-gray-500 bg-gray-100 dark:bg-white/10"}`}>
                      <Store className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-medium ${tienda ? "text-gold-900 dark:text-gold-100" : "text-gray-900 dark:text-gray-100"}`}>
                        Retiro en Tienda
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Sin costo adicional
                      </p>
                    </div>
                    {tienda && (
                      <div className="absolute top-3 right-3 text-gold-500">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {domicilio && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden">
                    <div className="pt-2">
                      <Input
                        label="Dirección de entrega"
                        name="direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        placeholder="Calle, #, Municipio"
                        icon={<MapPin className="w-5 h-5" />}
                      />
                    </div>
                  </motion.div>
                )}
                {tienda && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden">
                    <div className="flex gap-4 items-start p-4 mt-2 bg-gray-50 rounded-xl border border-gray-200 dark:bg-white/5 dark:border-white/10">
                      <MapPin className="flex-shrink-0 mt-1 w-5 h-5 text-gold-500" />
                      <div>
                        <span className="text-xs font-bold tracking-wider uppercase text-gold-600 dark:text-gold-400">
                          Punto de Recogida
                        </span>
                        <p className="mt-1 text-sm font-medium leading-relaxed text-gray-700 dark:text-gray-200">
                          Ave Palmar 719 Apt 39 entre Ave Norte y Ave Ceiba.
                          <br />
                          Casino Deportivo, Cerro, La Habana.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="hidden">
                <textarea
                  className="block p-4 w-full bg-transparent rounded-lg outline-none min-h-32"
                  type="text"
                  id="items"
                  name="items"
                  value={textareaValue}
                  readOnly
                />
              </div>

              <div className="pt-4">
                <Button
                  variant="primary"
                  onClick={nextStep}
                  className="py-4 w-full text-base shadow-lg shadow-gold-500/20 hover:shadow-gold-500/30">
                  Continuar al Pago
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-8">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-bodoni">
                  Información de Pago
                </h2>
                <div className="flex gap-2 justify-center items-center text-sm font-light text-gray-500 dark:text-gray-400">
                  <Lock className="w-3 h-3" />
                  <span>Transacción segura y encriptada</span>
                </div>
              </div>

              <div className="flex justify-center mb-8 perspective-1000">
                <div className="w-full max-w-[340px] transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl">
                  <TarjetaAnimada
                    Color={cardColor}
                    Data={formData}
                    expe={exp}
                  />
                </div>
              </div>

              <div className="p-6 space-y-5 rounded-2xl border border-gray-100 backdrop-blur-sm bg-white/50 dark:bg-white/5 dark:border-white/5">
                <Input
                  label="Número de Tarjeta"
                  name="tarjeta"
                  value={formData.tarjeta}
                  onChange={handleChangeCardNumber}
                  maxLength="19"
                  placeholder="0000 0000 0000 0000"
                  icon={<CreditCard className="w-5 h-5" />}
                />

                <div className="grid grid-cols-2 gap-5">
                  <Input
                    label="Vencimiento"
                    name="exp"
                    value={exp}
                    onChange={(e) => {
                      if (e.target.value.length <= 4) setExp(e.target.value);
                    }}
                    maxLength="4"
                    placeholder="MM/YY"
                    icon={<Calendar className="w-5 h-5" />}
                  />
                  <Input
                    label="CVC / CVV"
                    name="cvc"
                    placeholder="123"
                    maxLength="3"
                    type="password"
                    onChange={() => {}}
                    icon={<Lock className="w-5 h-5" />}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="flex-1 text-gray-600 border-gray-300 dark:border-gray-600 dark:text-gray-300">
                  Atrás
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="flex-1 py-4 shadow-lg shadow-gold-500/20 hover:shadow-gold-500/30">
                  Confirmar Orden
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-center items-center p-4 text-sm font-medium text-red-600 bg-red-50 rounded-xl border border-red-100 dark:bg-red-900/10 dark:border-red-800/30 dark:text-red-400">
            <AlertCircle className="flex-shrink-0 w-5 h-5" />
            {error}
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default MultiStepForm;

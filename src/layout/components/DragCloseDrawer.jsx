import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";

// eslint-disable-next-line react/prop-types
export const DragCloseDrawer = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { width }] = useMeasure();

  const x = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const xStart = typeof x.get() === "number" ? x.get() : 0;

    await animate("#drawer", {
      x: [xStart, width], // Animar en el eje horizontal
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 dark:bg-neutral-950/70 bg-neutral-200/70">
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ x: "100%" }} // Inicia fuera de la pantalla desde la derecha
            animate={{ x: "0%" }} // Se mueve hacia la posición inicial
            transition={{
              ease: "easeInOut",
            }}
            className="absolute right-0 top-0 h-full w-[75vw] max-w-md overflow-hidden dark:bg-neutral-900 bg-neutral-400"
            style={{ x }} // Animación basada en el eje `x`
            drag="x"
            dragControls={controls}
            onDragEnd={() => {
              if (x.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            dragElastic={{
              left: 0.5,
              right: 0,
            }}>
            <div className="absolute top-0 left-0 right-0 z-10 flex items-start justify- ite dark:bg-neutral-900">
              <button
                className="w-10 h-10 text-left dark:text-white"
                onClick={() => handleClose()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="relative z-0 h-full p-4 pt-10 pb-0 overflow-y-scroll">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

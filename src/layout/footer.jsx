import { Items } from "./components/items";

export default function Footer() {
  return (
    <footer className="overflow-hidden relative text-white bg-dark-900">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent to-transparent opacity-50 via-gold-400"></div>

      <div className="py-12 wrapper">
        <div className="flex flex-col gap-8 justify-center items-center">
          {/* Social Icons */}
          <div className="flex gap-8">
            {Items.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className="p-3 rounded-full transition-all duration-300 bg-white/5 hover:bg-gold-400 hover:text-white hover:-translate-y-1 hover:shadow-glow group">
                <item.icon className="w-6 h-6 opacity-70 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-gold-500/30"></div>

          {/* Copyright */}
          <div className="space-y-2 text-sm font-light text-center text-light-200/60">
            <p>
              &copy; {new Date().getFullYear()} Joyería Exclusiva. Todos los
              derechos reservados.
            </p>
            <p>
              Diseñado e implementado por{" "}
              <span className="font-medium text-gold-300">
                Ariel Chacon Artola
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

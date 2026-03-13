import useScrollReveal from '../../hooks/useScrollReveal' ;

export default function Reveal({ children, delay = "0ms" }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`transition-all duration-700 ease-out transform
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
    >
      {children}
    </div>
  );
}
export default function CardContainer({ titulo, children }) {
  return (
    <div className="my-8">
      <h1 className="text-xl font-bold mb-4 text-center lg:text-left">
        {titulo}
      </h1>{" "}
      <div className="flex flex-wrap justify-center">{children}</div>
    </div>
  );
}

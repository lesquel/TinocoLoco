export default function NotFound() {
  return (
    <div className="flex items-center justify-center p-4 w-full flex-wrap flex-col">
      <h1 className="text-2xl font-bold mb-2">No se encontró la página</h1>
      <p className="text-default-500">
        No se encontró la página solicitada. Por favor, inténtelo nuevamente.
      </p>
    </div>
  );
}
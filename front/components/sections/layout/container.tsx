export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto my-16 flex flex-col gap-10">
      {children}
    </div>
  );
};

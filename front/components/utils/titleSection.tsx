export const TitleSection = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <h2 className="text-2xl font-extrabold text-white sm:text-4xl pb-5 flex-1">
      {title} <span className="text-rose-500">{description}</span>
    </h2>
  );
};

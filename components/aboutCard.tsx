type CardProps = {
  title: string;
  description: string;
  image: string;
};

export default function ImageCard({ title, description, image }: CardProps) {
  return (
    <div
      className="relative m-auto flex flex-col justify-between lg:h-125 md:h-130 h-125 lg:w-full md:w-4/6 w-full p-6 rounded-3xl overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Always-on overlay */}
      <div className="absolute inset-0 "></div>

      {/* Title (Top Left) */}
      <div className="relative z-5">
        <h3 className="text-primary-black text-start text-4xl font-semibold">
          {title}
        </h3>
      </div>

      {/* Description (Bottom Left) */}
      <div className="relative z-5">
        <p className="text-[#A7A7BE] text-start lg:text-2xl md:text-4xl text-2xl">
          {description}
        </p>
      </div>
    </div>
  );
}

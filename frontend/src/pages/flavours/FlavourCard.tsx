import type { FlavourCardProps } from "../../types/types";

const FlavourCard = ({ name, src, description }: FlavourCardProps) => {
  return (
    <div className="flavour-card">
      <h3>{name}</h3>
      <img src={src} alt="Macaron Image" />
      <p>{description}</p>
    </div>
  );
};

export default FlavourCard;

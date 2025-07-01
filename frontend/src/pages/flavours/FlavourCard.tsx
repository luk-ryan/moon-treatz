import type { FlavourCardProps } from "../../types/types";

const FlavourCard = ({ name, src, description }: FlavourCardProps) => {
  return (
    <div>
      <h3>{name}</h3>
      <img src={src} alt="Macaron" style={{ width: "200px", height: "auto" }} />
      <p>{description}</p>
    </div>
  );
};

export default FlavourCard;

import './HeroTitle.scss'

export type TitleProps = {
  title: string;
  plot: string;
};

export const HeroTitle = ({ title, plot }: TitleProps) => {
  return (
    <div className="hero-title">
      <h2 className="hero-title__main">{title}</h2>
      <p className="hero-title__subtitle">{plot}</p>
    </div>
  );
};
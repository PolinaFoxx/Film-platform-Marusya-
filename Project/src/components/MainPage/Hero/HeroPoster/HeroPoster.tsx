import './HeroPoster.scss'

type HeroAdaptive = "desktop" | "mobile";


export type PosterProps = {
  posterUrl?: string;
  title: string;
   variant?: 'default' | 'xs';
     adaptive?: HeroAdaptive;

}

export const HeroPoster = ({ posterUrl, title, variant = 'default',  adaptive = "desktop",

}: PosterProps) => {

  return (
  
      <div className={`hero-poster ${variant === 'xs' ? 'hero-poster--xs' : ''} ${adaptive === 'mobile' ? 'hero-poster--mobile' : ''}`}>
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            className="hero-poster__image"
          />
        ) : (
          <div className="hero-poster__placeholder">
            <span>Постер отсутствует</span>
          </div>
        )}
      </div>
  
  )
}
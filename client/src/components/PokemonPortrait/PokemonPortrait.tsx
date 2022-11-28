import PokemonPortraitStyles from "./PokemonPortraitStyles";

interface PROPS {
  key: string,
  children: { [key: string]: any }
}

export default function PokemonPortrait({ children }: PROPS) {
  const classes = PokemonPortraitStyles();
  return (
    <div className={classes.Pokemon_Portrait}>
      {children}
    </div>
  )
}

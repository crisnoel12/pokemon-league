import { Card, Divider, Modal, Table, TableCell, TableRow, Typography, capitalize, List, ListItem, ListItemText } from '@material-ui/core';
import { INITIAL_STATE } from '../../store/reducers/reducer';
import CloseButton from '../UI/CloseButton/CloseButton';
import PokemonDataStyles from './PokemonDataStyles';

interface PROPS extends Partial<INITIAL_STATE> {
    deselectPokemon: () => void
}

const PokemonData = (props: PROPS) => {
    const pokemonDataClasses = PokemonDataStyles();
    const { selectedPokemon, deselectPokemon } = props;
    let pokemonData = null;

    if (selectedPokemon) {
        let pokemon = selectedPokemon;
        let pokemonTypes = pokemon.types.map((type: {[key: string]: any}, i: number, arr: any[]) => {
            if (arr.length - 1 === i) {
                return (
                    <Typography variant={"inherit"} key={i}>
                        <strong>{capitalize(type.type.name)}</strong>
                    </Typography>
                )
            } else {
                return (
                    <Typography variant={"inherit"} key={i}>
                        <strong>{capitalize(type.type.name)}</strong>,&nbsp;
                    </Typography>
                )
            }
        });
        let pokemonAbilities = pokemon.abilities.map((ability: {[key: string]: any}, i: number, arr: any[]) => {
            if (arr.length - 1 === i) {
                return (
                    <Typography variant={"inherit"} key={i}>
                        <strong>{capitalize(ability.ability.name)}</strong>
                    </Typography>
                )
            } else {
                return (
                    <Typography variant={"inherit"} key={i}>
                        <strong>{capitalize(ability.ability.name)}</strong>,&nbsp;
                    </Typography>
                )
            }
        });
        let pokemonStats = pokemon.stats.slice(0).map((stat: {[key: string]: any}, i: number) => {
            return (
                <ListItem key={i} classes={{ root: pokemonDataClasses.listItemRoot }}>
                    <ListItemText disableTypography classes={{ root: pokemonDataClasses.uppercase }}><strong>{stat.stat.name}:</strong> <Typography variant={"inherit"}>{stat.base_stat}</Typography></ListItemText> 
                </ListItem>
            );
        });
        pokemonData = (
            <Modal
                open={selectedPokemon ? true : false}
                onClose={deselectPokemon}
            >
                <Card className={pokemonDataClasses.cardRoot}>
                    <div style={{ position: 'relative', padding: '32px'}}>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <CloseButton onClose={deselectPokemon} />
                        <Typography variant={"h3"}>{capitalize(pokemon.name)}</Typography>
                        <Divider />
                        <Table>
                            <TableRow>
                                <TableCell variant="head">Type(s)</TableCell>
                                <TableCell>{pokemonTypes}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head">Abilities</TableCell>
                                <TableCell>{pokemonAbilities}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head">Stats</TableCell>
                                <TableCell>
                                    <List>
                                        {pokemonStats}
                                    </List>
                                </TableCell>
                            </TableRow>
                        </Table>
                    </div>
                </Card>
            </Modal>
        );
    }

    return pokemonData;
};

export default PokemonData;
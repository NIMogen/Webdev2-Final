export default function Menu(props) {
    let selected = props.selected;
    return (
        <div style={{position: 'absolute', zIndex: 1}}>
            {selected == 0 ? <h1 style={{color: 'red'}}>Save Game</h1> : <h1>Save Game</h1>}
            {selected == 1 ? <h1 style={{color: 'red'}}>Load Game</h1> : <h1>Load Game</h1>}
        </div>
    );
}
import { Link } from 'react-router-dom';

import './Hero.css';

const Hero = () => {
    return (
        <div style={{"position": "relative"}}>
          <img className="Pokemon-hero-img" src="https://media.giphy.com/media/8M8OxFRXpLFAI/giphy.gif" alt="Ash and Pikachu"/>
          <div className="overlay"></div>
          <Link className="btn btn-success hero-btn" to="/register-pokemon-lineup">Register Your Pokemon</Link>
        </div> 
    );
};

export default Hero;
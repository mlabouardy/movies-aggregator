import React from 'react';
import './Searchbar.css';

class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.onKeyStroke = this.onKeyStroke.bind(this);
    }

    onKeyStroke = (event) => {
        this.props.handleKeyStore(event.target.value ? event.target.value : "Marvel");
    }

    render() {
        return (
            <>
                <input type="text" aria-label="searchbar" className="form-control search_bar" placeholder="Search for a movie ..." onChange={this.onKeyStroke} />
            </>
        )
    }
}

export default Searchbar;
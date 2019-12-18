import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
const { Search } = Input;
export class SearchInput extends Component {
    state = {
        term: '',
    };

    handleSearch = e => this.setState({ term: e.target.value });

    onGetWeather = e => {
        e.preventDefault();
        this.props.searchWeather(this.state.term);
    }

    render() {

        return (
            <form onSubmit={this.onGetWeather}>
                <Search
                    placeholder="City Name...."
                    onChange={this.handleSearch}
                    style={{ width: 280 }}

                />
            </form>
        );
    }
}

export default SearchInput;
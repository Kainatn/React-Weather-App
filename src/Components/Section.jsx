import React, { Component } from 'react';
import Weather from './Weather';
import { Layout } from 'antd';
import SearchInput from './SearchInput';
import './Section.css';
import { Spin } from 'antd';
const { Header, Content } = Layout;
export class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullData: [],
            city: '',
            isLoading: true,
            dailyData: []
        }
    }
    async componentDidMount() {
        const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=Karachi&appid=a87cdcd4b5447059b08b41e4d2e6057f`;
        fetch(weatherURL)
            .then(res => res.json())
            .then(data => {
                const getCity = data.city.name;
                const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
                console.log(data.list.filter(reading => reading.dt_txt.includes("18:00:00")));
                this.setState({
                    city: getCity,
                    fullData: data.list,
                    dailyData: dailyData,
                    isLoading: false
                }, () => console.log(this.state))
            })
    }
    searchWeather = term => {
        this.setState({ isLoading: true });
        const weatherURL = ` https://api.openweathermap.org/data/2.5/forecast?q=${term}&appid=a87cdcd4b5447059b08b41e4d2e6057f`;
        fetch(weatherURL)
            .then(res => res.json())
            .then(data => {

                const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
                const getCity = data.city.name;
                this.setState({
                    city: getCity,
                    fullData: data.list,
                    dailyData: dailyData,
                    isLoading: false
                }, () => console.log(this.state));

            })


    }
    render() {
        console.log(this.state.dailyData);

        const { isLoading } = this.state
        return (
            <>
                <Header style={{ lineHeight: '20px' }}>
                    <img src={require('./../images/icon.svg')} className="head" width="50" alt="logo" /><h2 className="h2">Atom Weather App</h2>
                    <a href="https://ant.design"><h4 className="span">Made with Ant Design</h4></a>
                </Header>
                <div className="layout">
                    <Content>
                        <SearchInput searchWeather={this.searchWeather} />
                        <h1 style={{ margin: '1rem' }}>{this.state.city}</h1>
                        {isLoading ? <Spin /> :
                            <div className="mainFlex">{
                                this.state.dailyData.map((reading, index) => <Weather reading={reading} key={index} />)
                            }
                            </div>
                        }
                    </Content>
               
                </div>
            </>
        );
    }
}

export default Section;
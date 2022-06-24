import react, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll'

const state = {

}

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchField: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
           return response.json();
        })
        .then(users => {
            this.setState({robots: users})
        })
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })
    }

    render () {
        const filteredRobots = this.state.robots.filter(robot =>{
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
        })
        if (this.state.robots.length === 0) {
            return (
                <div>
                    <h1 className='f1 tc'>Loading...</h1>
                </div>
            )
        }
        else {
            return (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <CardList robots={filteredRobots} />
                    </Scroll>
                </div>
            );
        }

    }
}

export default App;
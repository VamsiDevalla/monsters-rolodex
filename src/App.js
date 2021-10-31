import { Component } from "react";
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import { Search } from "./components/search/search.component";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) =>
        this.setState({
          monsters: users,
          searchField: "",
        })
      );
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      searchField: e.target.value,
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1 className="web-title">Monsters Rolodex</h1>
        <Search
          placeholder="search monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

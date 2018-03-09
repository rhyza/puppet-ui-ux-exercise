import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const CONTACTS = [
  {firstName:"Zachary",lastName:"Borgetti",country:"USA",street:"2234 3rd Ave Site 3",city:"Seattle",state:"WA",zip:"98101",phone:"206-778-5741"},
  {firstName:"Landon",lastName:"Donovan",country:"USA",street:"1800 S Avalon Blvd",city:"Carson",state:"CA",zip:"90746",phone:"310-630-2200"},
  {firstName:"Samuel L.",lastName:"Jackson",country:"USA",street:"2226 2nd Ave",city:"Seattle",state:"WA",zip:"98121",phone:"206-441-5660"},
  {firstName:"Micheal",lastName:"Jordan",country:"USA",street:"1901 West Madison Street",city:"Chicago",state:"IL",zip:"60612",phone:"312-455-4000"},
  {firstName:"Aaron",lastName:"Meautiful",country:"Maxico",street:"3465 Calzada de Tlalpan",city:"Coyoacan",state:"CDMX",zip:"04650",phone:"+52-55-5487-3100"},
  {firstName:"Micheal",lastName:"Myers",country:"USA",street:"590 Galer St",city:"Austin",state:"TX",zip:"79935",phone:"915-857-1770"},
  {firstName:"Maite",lastName:"Perroni",country:"Maxico",street:"2101 Av. Juarez",city:"Mexico City",state:"CDMX",zip:"06050",phone:"+52 55 5365 1250"},
  {firstName:"Joel",lastName:"Schaper",country:"USA",street:"1823 Terry Ave, Suite 319",city:"Seattle",state:"WA",zip:"98121",phone:"206-258-4687"},
  {firstName:"Brian",lastName:"Stallone",country:"USA",street:"4567 Lake Washington Blvd NE, Suite 6709",city:"Kirkland",state:"OR",zip:"98132",phone:"425-333-4567"},
  {firstName:"Rahul",lastName:"Veloved",country:"England",street:"118 Piccadilly",city:"Mayfair",state:"London",zip:"W1J7NW",phone:"+44 (0)20-7042-7118"}
];

class ContactRow extends React.Component {
  render() {
    const contact = this.props.contact;

    return (
      <tr className="contact-row">
        <td>{contact.firstName}</td>
        <td>{contact.lastName}</td>
        <td>{contact.country}</td>
        <td>{contact.street}</td>
        <td>{contact.city}</td>
        <td>{contact.state}</td>
        <td>{contact.zip}</td>
        <td>{contact.phone}</td>
      </tr>
    );
  }
}

class ContactTable extends React.Component {
  render() {
    const contacts = this.props.contacts;
    const rows = contacts.map((contact) =>
      <ContactRow contact={contact} key={contact.phone} />
    );

    return (
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th> 
            <th>Country</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

class FilterBar extends React.Component {
  render() {
    return (
      <div>
        <h1 className="table-title">List of Awesome</h1>

        <h3 className="filter-title">Sort by:</h3>
        <select>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="country">Country</option>
          <option value="city">City</option>
          <option value="state">State</option>
        </select>

        <h3 className="filter-title">Items per page:</h3>
        <select>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>

        <h3 className="filter-title">1-10 of 30</h3>
        <button type="button">prev</button>
        <button type="button">next</button>
      </div>
    );
  }
}

class FilterableContactTable extends React.Component {
  render () {
    return (
      <div>
        <FilterBar />
        <ContactTable contacts={CONTACTS}/>
      </div>
    );
  }
}

class NavBar extends React.Component {
  render () {
    return (
      <nav>
        <a href="#">Nav Item 1</a>
        <a href="#">Nav Item 2</a>
        <a href="#">Nav Item 3</a>
      </nav>
    );
  }
}

class App extends React.Component {
  render () {
    return (
      <div>
        <NavBar />
        <FilterableContactTable />
      </div>
    );
  }
}

//==============================================================================

ReactDOM.render(<App />, document.getElementById('root'));


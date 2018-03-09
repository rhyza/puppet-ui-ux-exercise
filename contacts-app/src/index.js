import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const CONTACTS = [
  {firstName:"Zachary",lastName:"Borgetti",country:"USA",street:"2234 3rd Ave Site 3",city:"Seattle",state:"WA",zip:"98101",phone:"206-778-5741"},
  {firstName:"Zach",lastName:"Borgetti",country:"USA",street:"2234 3rd Ave Site 3",city:"Seattle",state:"WA",zip:"98101",phone:"206-778-5742"},
  {firstName:"Landon",lastName:"Donovan",country:"USA",street:"1800 S Avalon Blvd",city:"Carson",state:"CA",zip:"90746",phone:"310-630-2200"},
  {firstName:"Samuel L.",lastName:"Jackson",country:"USA",street:"2226 2nd Ave",city:"Seattle",state:"WA",zip:"98121",phone:"206-441-5660"},
  {firstName:"Micheal",lastName:"Jordan",country:"USA",street:"1901 West Madison Street",city:"Chicago",state:"IL",zip:"60612",phone:"312-455-4000"},
  {firstName:"Aaron",lastName:"Meautiful",country:"Mexico",street:"3465 Calzada de Tlalpan",city:"Coyoacan",state:"CDMX",zip:"04650",phone:"+52-55-5487-3100"},
  {firstName:"Micheal",lastName:"Myers",country:"USA",street:"590 Galer St",city:"Austin",state:"TX",zip:"79935",phone:"915-857-1770"},
  {firstName:"Maite",lastName:"Perroni",country:"Mexico",street:"2101 Av. Juarez",city:"Mexico City",state:"CDMX",zip:"06050",phone:"+52 55 5365 1250"},
  {firstName:"Joel",lastName:"Schaper",country:"USA",street:"1823 Terry Ave, Suite 319",city:"Seattle",state:"WA",zip:"98121",phone:"206-258-4687"},
  {firstName:"Brian",lastName:"Stallone",country:"USA",street:"4567 Lake Washington Blvd NE, Suite 6709",city:"Kirkland",state:"OR",zip:"98132",phone:"425-333-4567"},
  {firstName:"Rahul",lastName:"Veloved",country:"England",street:"118 Piccadilly",city:"Mayfair",state:"London",zip:"W1J7NW",phone:"+44 (0)20-7042-7118"}
];

function ContactRow(props) {
  const contact = props.contact;

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

class ContactTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleSortChange = this.handleSortChange.bind(this);
  }

  sortBy(contacts, field) {
    var sortedContacts = contacts.slice();
    sortedContacts.sort((a, b) => {
      var fieldA = a[field].toLowerCase();
      var fieldB = b[field].toLowerCase();

      if (fieldA < fieldB) {
        return -1;
      } else if (fieldA > fieldB) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedContacts;
  }

  handleSortChange(event) {
    this.props.onSortChange(event.target.value);
  }

  render() {
    const contacts = this.props.contacts;
    const numItems = this.props.numItems;
    const contactStart =  this.props.page * numItems;
    const contactEnd = Math.min(contactStart + numItems, contacts.length);

    var sortedContacts = this.sortBy(contacts, this.props.sort);
    if (!this.props.asc) {
        sortedContacts = sortedContacts.reverse();
    }
    const viewContacts = sortedContacts.slice(contactStart, contactEnd);
    const rows = viewContacts.map((contact) =>
      <ContactRow contact={contact} key={contact.name + contact.phone} />
    );

    return (
      <table>
        <thead>
          <tr>
            <th className="firstName">
              <button value="firstName" onClick={this.handleSortChange}>
                First Name
              </button>
            </th>
            <th className="lastName">
              <button value="lastName" onClick={this.handleSortChange}>
                Last Name
              </button>
            </th> 
            <th className="country">
              <button value="country" onClick={this.handleSortChange}>
                Country
              </button>
            </th>
            <th className="street">Address</th>
            <th className="city">
              <button value="city" onClick={this.handleSortChange}>
                City
              </button>
            </th>
            <th className="state">
              <button value="state" onClick={this.handleSortChange}>
                State
              </button>
            </th>
            <th className="zip">Zip</th>
            <th className="phone">Phone</th>
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
  constructor(props) {
    super(props);

    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleNumItemChange = this.handleNumItemChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleSortChange(event) {
    this.props.onSortChange(event.target.value);
  }

  handleNumItemChange(event) {
    this.props.onNumItemChange(event.target.value);
  }

  handlePageChange(event) {
    this.props.onPageChange(event.target.value);
  }

  render() {
    const numContacts = parseInt(this.props.numContacts);
    const numItems = parseInt(this.props.numItems);
    const page = parseInt(this.props.page);

    const multiplierBase = page * numItems;
    const contactStart =  multiplierBase + 1;
    const contactEnd = Math.min(multiplierBase + numItems, numContacts);

    return (
      <header>
        <section className="left-align">
          <span className="table-title">List of Awesome</span>
          <span className="pipe-divider"> | </span>

          <span className="filter-title">Sort by:</span>
          <select className="filter-options"
          value={this.props.sort} onChange={this.handleSortChange}>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="country">Country</option>
            <option value="city">City</option>
            <option value="state">State</option>
          </select>
        </section>

        <section className="right-align">
          <span className="filter-title">items per page:</span>
          <select className="filter-options"
          value={numItems} onChange={this.handleNumItemChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>

          <span className="pagination">
            <strong>{contactStart}-{contactEnd}
            </strong> of <strong>{numContacts}</strong>
          </span>
          <button className="nav-arrow" type="button"
            value={page - 1} onClick={this.handlePageChange}>&lt;
          </button>
          <button className="nav-arrow" type="button"
            value={page + 1} onClick={this.handlePageChange}>&gt;
          </button>
        </section>
      </header>
    );
  }
}

class FilterableContactTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 'lastName',
      asc: true,
      numItems: 10,
      page: 0
    };

    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleNumItemChange = this.handleNumItemChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleSortChange(sortFilter) {
    var order = (this.state.sort == sortFilter) ? !this.state.asc : true;

    this.setState({
      sort: sortFilter,
      asc: order,
      page: 0
    });
  }

  handleNumItemChange(numItems) {
    this.setState({
      numItems: parseInt(numItems),
      page: 0
    });
  }

  handlePageChange(page) {
    const pageNum = parseInt(page);
    const numPages = Math.ceil(CONTACTS.length / this.state.numItems);

    if (pageNum < 0 || pageNum >= numPages) {
      return;
    }
    this.setState({
      page: pageNum
    });
  }

  render () {
    return (
      <main>
        <FilterBar
          numContacts={CONTACTS.length}

          sort={this.state.sort}
          numItems={this.state.numItems}
          page={this.state.page}

          onSortChange={this.handleSortChange}
          onNumItemChange={this.handleNumItemChange}
          onPageChange={this.handlePageChange}
        />
        <ContactTable
          contacts={CONTACTS}

          sort={this.state.sort}
          asc={this.state.asc}
          numItems={this.state.numItems}
          page={this.state.page}

          onSortChange={this.handleSortChange}
        />
      </main>
    );
  }
}

class NavBar extends React.Component {
  render () {
    return (
      <nav>
        <ul>
          <li><a href="#" className="active">Nav Item 1</a></li>
          <li><a href="#">Nav Item 2</a></li>
          <li><a href="#">Nav Item 3</a></li>
        </ul>
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

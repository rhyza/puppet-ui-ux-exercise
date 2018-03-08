import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

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

//==============================================================================

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

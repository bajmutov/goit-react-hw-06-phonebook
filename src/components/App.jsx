import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const KEY_CONTACTS = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(KEY_CONTACTS)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(KEY_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const isAlreadyExist = contacts.find(el => el.name === name);
    if (isAlreadyExist) return alert(`${name} is already in contacts`);
    // console.log('data', contacts);
    const newUser = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prev => [newUser, ...prev]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContact = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    if (contacts) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  };

  const handleDelete = id =>
    setContacts(prev => prev.filter(el => el.id !== id));

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter changeFilter={changeFilter} value={filter} />
      <ContactList
        userContacts={getVisibleContact()}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;

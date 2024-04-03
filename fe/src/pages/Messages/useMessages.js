import {
  useState, useCallback, useEffect, useMemo,
} from 'react';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import ContactsService from '../../services/ContactsService';
import MessagesService from '../../services/MessagesService';

// import toast from '../../utils/toast';

export default function useMessages() {
  const history = useHistory();
  const socket = useMemo(() => io('http://localhost:3001'), []);

  const [hasError, setHasError] = useState(false);
  const [orderBy, setOrderBy] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected', socket.id);
    });

    socket.on('welcome', (sockets) => {
      console.log(sockets);
    });
    // const connection = MessagesService.connect();
    // console.log('chatId', connection.connected);
    // console.log('chatId', connection.id);
    // connection.onAny((event, ...args) => {
    //   console.log(`got ${event}`);
    //   console.log(`got ${args}`);
    // });

    // MessagesService.sendMesssage('messageeeeeeee');

    // return () => {
    //   MessagesService.disconnect();
    // };
    return () => {
      socket.disconnect();
    };
  }, [MessagesService]);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('message', message);
    setMessage('');
  };

  const loadContacts = useCallback(async (signal) => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listContacts(signal, orderBy);

      if (contactsList.error) {
        setHasError(true);
        setContacts([]);
        history.push('/login');
      }

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    const controller = new AbortController();

    loadContacts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadContacts]);

  function handleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const quantityOfContacts = contacts.length;
  const quantityOfFilteredContacts = filteredContacts.length;

  return {
    message,
    handleTryAgain,
    orderBy,
    handleOrderBy,
    isLoading,
    hasError,
    contacts,
    quantityOfContacts,
    searchTerm,
    handleChangeSearchTerm,
    filteredContacts,
    quantityOfFilteredContacts,
    handleSubmit,
  };
}

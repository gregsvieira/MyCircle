/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */

import React, { useState, useMemo, useRef } from 'react';
import csv from 'csvtojson';
import FormGroup from '../../components/FormGroup';
// import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form, ButtonContainer } from './styles';
import useErrors from '../../hooks/useErrors';
import PageHeader from '../../components/PageHeader';
import ContactsList from '../Contacts/components/ContactsList';
import InputSearch from '../Contacts/components/InputSearch';
import InputFileUpload from './InputFileUpload';
import UploadService from '../../services/UploadService';
import toast from '../../utils/toast';
import validateFields from '../../utils/validateFields';

import Modal from '../../components/Modal';

export default function UploadContacts() {
  const [csvData, setCsvData] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contacts,
    setContacts] = useState([]);
  const [orderBy, setOrderyBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const reader = new FileReader();
  console.log(editingContact);
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  const handleRead = async (file) => {
    reader.onload = (event) => {
      const content = event.target.result;
      const jsonContent = csv(
        {
          noheader: false,
          output: 'json',
          delimiter: ';',
          headers: ['name', 'email', 'phone', 'category'],
        },
      ).fromString(content);

      jsonContent.then((data) => {
        const formatedContact = data.map((contact, index) => {
          const errors = validateFields(contact.name, contact.email, contact.phone);

          return {
            ...contact,
            id: String(index),
            category: {
              name: contact.category,
              id: String(index),
            },
            errors,
          };
        });
        setContacts(formatedContact);
      });
    };

    reader.readAsText(file);
  };

  const handleChoose = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (!file.name.endsWith('.csv')) {
        setError({ field: 'file', message: 'Only CSV files are accepted' });
      } else {
        removeError('file');
        setCsvData(file.name);
        setSelectedFile(file);
        handleRead(file);
      }
    }
  };

  function handleOrderBy() {
    setOrderyBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    const result = await UploadService.uploadFile(contacts);

    if (result) {
      toast({
        type: 'success',
        text: `Contacts added: ${result.contacts.length}`,
      });
      toast({
        type: 'success',
        text: `Categories added: ${result.categories.length}`,
      });
    }
    setIsSubmitting(false);
  }

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  // const handleCancelEdit = () => {
  //   setEditingContact(null);
  // };

  // const handleSaveEdit = () => {
  //   setEditingContact(null);
  // };

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleCloseDeleteContact() {
    try {
      setIsLoadingDelete(true);

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Contact deleted successfully',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Unable to delete contact',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  const hasContacts = contacts.length > 0;

  return (
    <>
      <PageHeader path="/" />

      {hasContacts && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Form onSubmit={handleSubmit} noValidate>
        <FormGroup error={getErrorMessageByFieldName('file')}>
          <InputFileUpload
            onClick={handleClick}
            error={getErrorMessageByFieldName('file')}
            onChange={handleChoose}
            ref={fileInputRef}
            fileFormat=".csv"
            selectedFile={selectedFile}
          />
        </FormGroup>

        <ButtonContainer>
          <Button
            type="submit"
            disabled={!csvData || isSubmitting || errors.length > 0 || !hasContacts}
            isLoading={isSubmitting}
          >
            Import
          </Button>
        </ButtonContainer>
      </Form>

      {hasContacts && (
        <>
          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleOrderBy}
            onDeleteContact={handleDeleteContact}
            onEditContact={handleEditContact}
            isEditable
          />

          <Modal
            danger
            isLoading={isLoadingDelete}
            title={`Are you sure you want to remove the "${contactBeingDeleted?.name}" contact of the import list?`}
            confirmLabel="Delete"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleCloseDeleteContact}
            visible={isDeleteModalVisible}
          >
            <p>
              You can&apos;t restore this contact after remove
            </p>
          </Modal>
        </>
      )}
    </>
  );
}

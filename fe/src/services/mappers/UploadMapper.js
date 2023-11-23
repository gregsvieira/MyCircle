class UploadMapper {
  toPersistence(domainData) {
    const categoryNames = domainData.map(({ category }) => category.name);
    const uniqueCategoryNames = Array.from(new Set(categoryNames));
    const categories = uniqueCategoryNames.map((name) => ({ name }));

    const contacts = domainData.map((contact) => ({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      category: contact.category.name,
    }));

    return { categories, contacts };
  }

  toPersistenceBatchContacts(domainContacts) {
    const uniqueCategoryNames = Array.from(new Set(domainContacts));

    const contacts = uniqueCategoryNames.map((name) => ({ name }));

    return contacts;
  }
}

export default new UploadMapper();

class ContactMapper {
  toPersistence(domainContact) {
    return {
      id: domainContact.id,
      name: domainContact.name,
      email: domainContact.email,
      phone: domainContact.phone,
      category_id: domainContact.categoryId,
    };
  }

  toDomain(persistenseContact) {
    return {
      id: persistenseContact.id,
      name: persistenseContact.name,
      email: persistenseContact.email,
      phone: persistenseContact.phone,
      category: {
        id: persistenseContact.category_id,
        name: persistenseContact.category_name,
      },
    };
  }
}

export default new ContactMapper();

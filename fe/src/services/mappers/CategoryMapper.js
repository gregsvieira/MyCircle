class CategoryMapper {
  toPersistence(domainContact) {
    return {
      name: domainContact.name,
    };
  }

  // toDomain(persistenseContact) {
  //   return {}
  // }
}

export default new CategoryMapper();

class CategoryMapper {
  toPersistence(domainCategory) {
    return {
      name: domainCategory.name,
    };
  }

  toDomain(persistenseCategory) {
    return {
      id: persistenseCategory.id,
      name: persistenseCategory.name,
    };
  }
}

export default new CategoryMapper();

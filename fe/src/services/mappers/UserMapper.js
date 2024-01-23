class UserMapper {
  toPersistenceSignIn({ email, password }) {
    return { email, password };
  }

  toPersistenceSignUp({
    name, username, email, password,
  }) {
    return {
      name, username: username.toLowerCase(), email, password,
    };
  }

  toDomain(auth) {
    return auth;
  }
}

export default new UserMapper();

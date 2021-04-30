module.exports = {
  render(repository) {
    return {
      id: repository.id,
      name: repository.name,
      description: repository.description,
      public: repository.public,
      slug: repository.slug,
      stars: repository.stars,
      user_id: repository.user_id,
    };
  },

  renderMany(repositories) {
    return repositories.map(repository => this.render(repository));
  },

  renderDetail(repository) {
    return {
      id: repository.id,
      name: repository.name,
      description: repository.description,
      public: repository.public,
      slug: repository.slug,
      user_id: repository.user_id,
      stars: repository.stars,
    };
  },
};

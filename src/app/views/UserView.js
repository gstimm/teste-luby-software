import RepositoryView from './RepositoryView';

module.exports = {
  render(user) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      location: user.location,
      avatar: user.avatar,
      bio: user.bio,
    };
  },

  renderMany(users) {
    return users.map(user => this.render(user));
  },

  renderDetail(user) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      location: user.location,
      avatar: user.avatar,
      bio: user.bio,
      followers: user.followers,
      followings: user.followings,
      repositories: RepositoryView.renderMany(user.repositories),
    };
  },
};

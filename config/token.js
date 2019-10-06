module.exports = {
  get token() {
    return this.bearer_token;
  },
  set token(val) {
    this.bearer_token = val;
  },
  bearer_token: null
};

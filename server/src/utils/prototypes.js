Array.prototype.count = function (check) {
  return this.reduce((acc, item) => acc + !!check(item), 0);
};

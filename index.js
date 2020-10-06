class Declare {
  constructor(execute = () => {} ){
    this.handlers = () => {};
    this.state = 'PENDING';
    this.value = null;
    execute(this.resolve.bind(this));
  };

  resolve(value) {
    if (this.state === 'PENDING') {
      this.value = value;
      this.state = 'FULFILLED';
      this.handlers(value);
    };
  };

  then(execute = () => {}){
    this.handlers = execute;
    if (this.state === 'FULFILLED') {
      return new Declare((resolveExecute) => {
        resolveExecute(execute(this.value))
      });
    } else {
        return this;
    }
  };
};
module.exports = Declare


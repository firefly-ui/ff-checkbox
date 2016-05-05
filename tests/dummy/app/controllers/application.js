import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toggleProperty(property) {
      this.toggleProperty(property);
    }
  }
});

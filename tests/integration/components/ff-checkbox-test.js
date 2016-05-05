import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ff-checkbox', 'Integration | Component | ff checkbox', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ff-checkbox}}`);

  assert.equal(this.$('input').length, 1);
});


test('it updates toggles checked property correctly', function(assert) {
  assert.expect(4);

  this.render(hbs`{{ff-checkbox checked=checked on-change=(action (mut checked))}}`);

  this.$('input').click();

  assert.equal(this.$('input').prop('checked'), true, 'it updates input');
  assert.equal(this.get('checked'), true, 'it updates property');

  this.$('input').click();

  assert.equal(this.$('input').prop('checked'), false, 'it updates input');
  assert.equal(this.get('checked'), false, 'it updates property');
});

test('when disabled it does not update `checked` property to true when clicked', function(assert) {
  assert.expect(0);

  this.set('onChangeAction', () => {
      assert.ok('should not happen');
  });

  this.render(hbs`{{ff-checkbox disabled=true on-change=(action onChangeAction)}}`);

  this.$('input').click();
});

test('does not update indeterminate state when no action is passed', function(assert) {
  assert.expect(1);

  this.render(hbs`{{ff-checkbox indeterminate=true}}`);

  this.$('input').click();

  assert.equal(this.$('input').prop('indeterminate'), true, 'it does not remove indeterminate state');
});

test('it sends the correct values on change', function(assert) {
  assert.expect(3);

  this.set('onChangeAction', (checked, { value, indeterminate }) => {
      assert.equal(checked, false, 'sent checked value is correct');
      assert.equal(indeterminate, false, 'sent indeterminate value is correct');
      assert.equal(value, 'test', 'sent value is correct');
  });

  this.render(hbs`{{ff-checkbox checked=true indeterminate=true value="test" on-change=(action onChangeAction)}}`);

  this.$('input').click();
});
